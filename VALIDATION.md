# Validation

Package: `t1a-slides@1.6.7`, built 2026-11-05.

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
