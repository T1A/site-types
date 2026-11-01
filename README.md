# T1A site types

Site type packages for SecondStack Sites. Each type lives in its own folder and supplies a shared viewer; individual sites hold only their data.

| Folder | Package | Description |
| --- | --- | --- |
| [`slides/`](./slides) | `t1a-slides@1.6.6` | Presentation decks with t1a, SecondStack, LakeSentry, Antares and Swiss themes. |

## Install from GitHub

In ControlTower, open **Sites → Site types → Add GitHub source** and enter:

```text
https://github.com/T1A/site-types/tree/main/slides
```

Use the folder URL, including `/tree/main/slides`. **Reload sources** fetches later package versions from this branch. For a fixed revision, replace `main` with a full commit SHA.

The package keeps the `t1a-slides` identity and project data contract. Its files match the staging-tested 1.6.6 ZIP, so adding the GitHub source reuses that installed version. Chat requires exactly one installed Slides-family type.

## Slides

The package includes the designer's five themes, palettes, fonts, logos, icons and reference decks under `templates/<theme>/project/`. The t1a reference library contains 28 corporate slides. Six starter examples supply the gallery choices, with previews in every theme.

The viewer supports embedded decks, guarded text saves, presenter connections, PDF printing and PowerPoint export. It retains the designer's panel layout, story backgrounds, journey positioning and t1a color checks.

## Validate and package

The viewer checks use the pinned Playwright dependency in `checks/package-lock.json`, Node.js 22 or later, and Chromium:

```sh
cd checks
npm ci
npx playwright install chromium
npm run check
cd ..
```

The seven-deck corpus checks slide diagnostics, keyboard navigation, presenter synchronization, light and dark rendering, PDF page counts, PowerPoint files, host commands, guarded text editing and selection actions.

After changing themes or starter samples, regenerate their previews:

```sh
node checks/preview-starters.mjs --package ./slides
node checks/preview.mjs
```

To compare rendering with the original designer package:

```sh
node checks/designer-compatibility.mjs /path/to/original/slides
```

To build a ZIP upload instead of installing from GitHub:

```sh
uv run --no-project checks/package_zip.py
```

The ZIP in `dist/` contains only the contents of `slides/`; its checksum is written beside it. Dependencies and check output stay outside the package.

## Package versions

An installed version is immutable. Any change inside a type's folder needs a new version in its `type.json`, viewer version constant and `SKILL.md`. Within a major version, preserve the data contract and documented building blocks: major-following sites receive newer stable versions when the source is reloaded. Breaking changes require a new major version.

To add another site type, place its package in a separate root folder and add it to the table above. Each package must contain `type.json` and `index.html`.

See [PROVENANCE.md](./PROVENANCE.md) for source attribution and [VALIDATION.md](./VALIDATION.md) for the initial Slides checks. The repository uses the [MIT license](./LICENSE); vendored assets retain the licenses listed in `slides/NOTICE.md`.
