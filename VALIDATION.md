# Validation

Package: `t1a-slides@1.6.11`, built 2026-11-13.

1.6.11 adds a Charts section to `SKILL.md` from the T1A dataviz course: chart type by task, zero baselines and scale breaks, at most three lines, sorting, tick steps, no rotated text, number formats, chart titles with measure, unit and period, no 3D or gradients, gaps between donut parts, no footnotes in chart labels, question titles for several charts. Checked by rendering a ten-slide sales deck in check mode.

1.6.10 adds chart rules and tokens in `slide.css` and `SKILL.md`: `div.chart-head` puts the legend above the chart with `span.swatch` marks; `--good` and `--bad` colour the one part a slide is about, green for good and red for bad, never the accent, with the rest in the neutral grays `--shade-1` to `--shade-4`; `ul.meters` takes `li.good` and `li.bad`; a legend or direct labels, not both; parts of a whole only as a donut of at most five parts, no pie charts; the Gantt legend keeps its padding. Checked by rendering test decks in check mode: t1a light and dark, line, bar, waterfall, Likert, meter and donut charts.

1.6.9 adds blocks and rules in `slide.css` and `SKILL.md`: `div.browser` showcase, `div.demo` screen-recording layout, live HTML screens and `video` in device frames, `ul.meters` progress bars, `span.rag` status marks, Gantt phase classes, white ink on the t1a teal panel, phone caption strips that reach the phone; rules for one-line eyebrows, no builds on joined diagrams, journeys only for two-party projects, recordings first in product slides, and no value axis when every bar has its value. Checked locally by rendering test decks (web product, mobile, demo, SteerCo, assessment, RFP, QBR) on the t1a preset; the viewer is unchanged apart from its version constant.

1.6.8: slide frames reset the text styles a button passes down (`text-align`, letter and word spacing, `text-transform`, `text-indent`, `white-space`). Strip, overview and other thumbnails sit inside buttons and inherited centred text, so their layout differed from the stage. Checked locally on the t1a preset deck: strip frames now compute `text-align: start`, like the stage.

1.6.7 changes only the agent guidance in `slides/SKILL.md` (design rules from deck reviews) and the version string. The viewer (apart from its version constant), themes and starters are unchanged from 1.6.6, so the 1.6.6 results below still apply.

## 1.6.6 results

- Seven-deck viewer check passed: 66 slides, 266 stage/print screenshots, light and dark schemes, keyboard navigation, overview, presenter synchronization, PDF page counts and PowerPoint exports.
- The embed fixture passed host origin checks, progressive publishing, fullscreen, presenter connections, edit and selection actions, and an explicit assertion that `edited.baseHtml` equals the original slide source.
- All 124 stage images across the original five themed decks and corporate template matched the designer's package byte for byte in the same Chromium build.
- All 185 starter slide previews regenerated successfully: six examples across five themes, with no reported slide or package issues.
- ControlTower's production `readSiteTypeArchive` accepted the final upload ZIP: 438 files, 12,420,005 compressed bytes.
- The current Chat parser definitions accepted all five themes, six starters and 190 preview assets. The pure parser definitions ran outside the application, without network services.
- ZIP integrity and JavaScript syntax checks passed. The focused Astra prose audit found no wording changes needed.

The viewer ran locally through the typed-site test server. The operator subsequently confirmed that the ZIP worked in staging. Live agent deck generation and Google Slides conversion were not independently verified in this validation run.

The package uses the existing 1.6.5 project data contract and type name. It upgrades major-following `t1a-slides` decks when installed. No platform application source was changed.
