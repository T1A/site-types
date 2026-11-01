# Package checks

Run from the repository root with the pinned Playwright dependencies and Chromium available:

```sh
node checks/run.mjs --package ./slides --save
```

The corpus contains the five original designer theme decks, the corporate template and the current embed fixture. The corporate fixture deliberately includes one invalid orange-on-dark slide; the package's reference template excludes it.

Every deck runs through check mode, keyboard navigation, overview, presenter synchronization, stage and print rendering in both schemes, PDF page counting and PowerPoint export. The embed fixture checks origin guards, missing-slide publishing, fullscreen, presenter connections, host export, text editing and selection actions. An edit must carry the original `baseHtml` required by the current host's guarded save.

The copied upstream harness checks external packages with `--package`; use that flag here to avoid looking for upstream release tags. It writes its report and optional screenshots to `checks/out/`.

```sh
node checks/preview-starters.mjs --package ./slides
node checks/preview-starters.mjs --package ./slides --starter onboarding
node checks/preview.mjs
node checks/designer-compatibility.mjs /path/to/designer/slides
uv run --no-project checks/package_zip.py
```

Starter generation checks every slide for overflow and package issues before writing the gallery images. The designer comparison renders all original fixture slides in both schemes with each package in the same browser, compares their PNG bytes, and saves mismatches under `validation/designer-comparison/`.

The archive build includes only `slides/`, enforces the package's file and size limits, and writes a SHA-256 checksum beside the ZIP in `dist/`.
