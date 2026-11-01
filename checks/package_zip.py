"""Build a deterministic ControlTower upload ZIP from slides/."""
import hashlib
import json
import stat
import zipfile
from pathlib import Path

root = Path(__file__).resolve().parents[1]
package = root / 'slides'
manifest = json.loads((package / 'type.json').read_text())
files = sorted(path for path in package.rglob('*') if path.is_file())
assert len(files) <= 2000
assert sum(path.stat().st_size for path in files) <= 90 * 1024 * 1024
output = root / 'dist'
output.mkdir(exist_ok=True)
archive = output / f'{manifest["name"]}-{manifest["version"]}.zip'
with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as bundle:
    for path in files:
        relative = path.relative_to(package)
        assert not path.is_symlink()
        assert all(not part.startswith('.') and part != 'node_modules' for part in relative.parts)
        entry = zipfile.ZipInfo(relative.as_posix(), date_time=(2026, 11, 1, 0, 0, 0))
        entry.create_system = 3
        entry.external_attr = (stat.S_IFREG | 0o644) << 16
        entry.compress_type = zipfile.ZIP_DEFLATED
        bundle.writestr(entry, path.read_bytes())
digest = hashlib.sha256(archive.read_bytes()).hexdigest()
archive.with_suffix('.zip.sha256').write_text(f'{digest}  {archive.name}\n')
print(f'{archive}: {len(files)} files, {archive.stat().st_size} bytes, SHA-256 {digest}')
