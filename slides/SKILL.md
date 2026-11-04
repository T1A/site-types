# Slides 1.6.6

A Slides site is a presentation. The viewer is part of the site type: it shows each slide in a 16:9 frame, with keyboard and touch navigation, an overview, a presenter window with notes and a timer, fullscreen, light and dark themes and print to PDF. You write only the deck data: one JSON file and one HTML fragment per slide. Do not write `index.html`, CSS files or JavaScript.

## Files

Everything lives under `project/` in the site directory:

```
project/deck.json            title, slide order, sections, theme
project/slides/<id>.html     one slide each
project/assets/...           images and other media
```

`deck.json`:

```json
{
  "v": 1,
  "title": "Q3 review",
  "lang": "en",
  "order": ["cover", "agenda", "results", "next-steps"],
  "sections": {
    "now": { "title": "Where we are", "start": "results" }
  },
  "theme": { "preset": "t1a" }
}
```

- `v` is always `1`. `order` lists the slide ids; an id is 1-64 lowercase letters, digits and inner hyphens, and names the file `project/slides/<id>.html`.
- `sections` is optional. A section runs from its `start` slide to the next section's start; the overview groups slides by section and the slide footer shows the section title.
- `lang` is optional and sets the language of the slide text.
- `theme` is optional. `preset` names one of the type's themes (see Themes); without it the deck uses the type's default theme. The other keys override the theme one by one, so set them only for what the user wants different from it. `scheme` is `light` or `dark` (the audience can switch). `light` and `dark` each take any of the colors `background`, `surface`, `foreground`, `muted`, `accent`, `onAccent`, `border` as CSS color strings. `fonts` takes the roles `display`, `body` and `mono`, each `{"family": "...", "href": "https://fonts.googleapis.com/css2?family=..."}` (Google Fonts only) or `{"family": "...", "faces": [{"src": "assets/fonts/x.woff2", "weight": "100 900"}]}` (files under `project/`).

## Slide files

A slide file holds exactly one `<section>`. An optional last child `<aside>` holds the speaker notes as plain text; it is shown only in the presenter window.

```html
<section>
  <h2>Revenue grew in every region</h2>
  <ul>
    <li><strong>EMEA +18%</strong>, driven by renewals</li>
    <li><strong>Americas +11%</strong>, two large new accounts</li>
  </ul>
  <aside>Mention the currency effect if asked.</aside>
</section>
```

- The frame is 1920×1080 px with generous margins. Plain HTML is already styled: `h1` to `h4`, `p`, `ul`, `ol`, `blockquote` with `cite`, `figure` with `figcaption`, `table`, `pre`/`code`, `strong`, `em`, `mark`, `a`, `kbd`, `hr`.
- Choose a layout with `data-layout` on the section; without it the slide is a title with content below:
  - `title`: cover slide, content at the bottom left. Use `h1`, `p.lead`, `p.meta`.
  - `section`: divider between parts. Use `p.eyebrow` and `h2`.
  - `statement`: one large sentence in `h2`; `em` or `strong` words are highlighted.
  - `quote`: one `blockquote` with a `cite`.
  - `center`: centered content, for a closing slide.
  - `image`: the first child `img` or `figure` fills the slide; text after it sits on a dark scrim at the bottom.
  - `split`: first child is a `div` with the text, last child an `img`, `figure` or `div.media` filling the right half. Put the picture first to fill the left half instead, with the text at the top right.
  - `panel`: first child is a `div.panel` that fills the left third with a color; the text follows on the right. For a case or a partner slide. A `div.stats` in the panel stacks the key results there.
  - `blank`: no margins and no footer, for a slide you compose entirely yourself.
- `data-theme="dark"`, `"light"` or `"accent"` on the section gives one slide its own colors, for emphasis.
- A footer with the deck title, section and slide number appears on every slide except `title`, `section`, `image` and `blank` layouts. `data-footer="off"` hides it on one slide, `data-footer="on"` shows it on one of those layouts.
- Building blocks:
  - `p.eyebrow` small label above a heading; `p.lead` larger intro text; `.muted`, `.accent`, `.small`.
  - `div.cols` puts its children side by side in equal columns; add `wide-left` or `wide-right` for 3:2, `middle` to center them vertically.
  - `div.cards` with `div.card` children (`h3` + `p`); `card highlight` marks one.
  - `div.stats` with `div.stat` children: `<strong>42%</strong><span>label</span>`.
  - `ol.steps` for a numbered process: `<li><strong>Step</strong>Description</li>`. `ol.steps.numerals` sets large pale numbers 01, 02, 03 above each step instead of the small discs.
  - `p.callout` or `div.callout` for a key takeaway. `ul.check` for a checklist, `ul.plain` without markers.
  - `.grow` makes an element take the remaining height; `.bottom` pushes it to the bottom; `figure.fill` makes an image fill the remaining space.
  - `td.num` / `th.num` align numbers right; `tr.highlight` emphasizes a row.
  - `ol.agenda` for an agenda: large numbered items; `li.active` marks the part about to start and dims the others.
  - `ol.timeline` for dates on a line: `<li><strong>Week 1-2</strong>What happens</li>`; `li.done` checks a step off, `li.key` highlights the key result.
  - `ol.journey` for stages as pills on a descending staircase joined by elbow arrows, up to about seven. The outline color says who does the stage: plain pills are ours (purple in t1a), `li.partner` (teal in t1a) is done by the partner or the client. Use `li.partner` only when the work is split, and then add `ul.owners` after the list, `<li>T1A</li><li class="partner">Partner</li>`, as the legend. Never use the color for milestones.
  - `div.cards.packages` for offers or options: tall outlined cards, each `<p class="meta"><span>Duration</span><span>Price</span></p>`, a line drawing `<div class="art lines"></div>` (`lines`, `bars`, `grid` or `rings`, one per card), `h3` and a short `p`; `card highlight` fills one.
  - `ul.tags` for small outlined pills (industry, technology, scope).
  - `div.onepager` on a `blank` slide for the company or a project on one page: four cells between hairlines, `div.brand` (in t1a `<span class="logo"></span>` and a `p` tagline), `div.hero` (a `div.stat`, an optional `p.site` link; in t1a add `globe` to the class for the t1a.com globe with the office pins), `div.fact` (a `div.stat` and one `p`) and `div.partners` (a `p` label and `ul.logos` with one partner logo `img` per item, from `project/assets/`).
  - `div.window` frames one `img`, inline `svg` or `iframe` as a product screen in a browser window with three dots.
  - `div.showcase` for a product on a laptop with the key numbers beside it: the first child is a `div` with a `p.band` caption on a dark strip from the slide edge and a `div.stats` of up to 3 stats stacked; the second child is `div.laptop` holding one `img`, inline `svg` or `iframe` as the screen (16:10). Draw a product screen as inline SVG in the product's own colors and say in the notes when it is an illustration. For a mobile app, use `div.phone` instead of `div.laptop` (one `img` or inline `svg`, portrait, it runs off the bottom edge) and add a third child: a `div` with a `p.band` and a `ul.bars` of 3-4 short points.
  - `ul.points` for 2-6 points with icons: `<li><span class="icon lock"></span><h3>Title</h3><p>Text</p></li>`; the h3 is optional, 5-6 items make a 3x2 grid, `ul.points.badges` puts the icons in filled discs. Built-in icons: lock, shield, star, heart, bell, award, book, check, sliders, map, chart, trend, pie, users, user, cloud, database, server, cpu, code, rocket, gear, clock, calendar, globe, target, zap, idea, search, layers, workflow, puzzle, handshake, briefcase, money, wallet, document, chat, mail, mobile, education, brain, bot, sparkles, gauge, branch, sync, eye, flag, key, building, truck, cart, leaf, scale, link, download, play. For another icon, put an inline `svg` with `stroke="currentColor"` in the `span.icon`.
  - `ol.halves` for exactly six points: 01-03 on the left half, 04-06 on a color panel that fills the right half; each `<li><strong>Title</strong>Short text</li>`.
  - `div.roles` for two team roles: an `h2`, then two `div`s, each an `h3`, a `p` and a `ul.tags` of skills. The second role sits on a color half; `div.roles.left` colors the left half instead.
  - `ul.team` for people: `<li><img src="assets/people/name.jpg" alt=""><strong>Name</strong><span>Role</span></li>`, 3-4 people; without a photo use `<span class="avatar">AB</span>`.
  - `ul.logos.wall` for client logos: up to 20 `img` items in five columns. Show only clients relevant to the audience.
  - `div.cases` for similar cases: a first `div` with the `h2` and a `p`, then three `div.case` tiles (`teal`, `purple`, `blue`, `orange` or `gray`), each `ul.tags` (duration first, then volumes), `h3`, `p` and optionally a country map `img`.
  - `div.onepager.case` on a `blank` slide for one case on one page: `div.brand` (`span.logo` and `ul.tags`), `div.hero` with the `h2`, `div.cols` with Problem and Solution lists, `div.partners` and `div.stats` with two stats.
  - `div.gantt` for a plan by months: `ul.legend` of statuses, `div.months` of `span`s (`data-year="2026"` on the first month of a year), and `div.bars` of `p` bars with `style="--from: 2; --span: 3"` (months from the first column, fractions allowed) and a status class `done`, `wip`, `offset`, `blocked` or `planned`; a `p.milestone` with `style="--at: 7.5"` draws a dotted line. Set `style="--months: N"` on the `div.gantt` when it has other than 12 months. Keep it to about 8 bars with two short lines each.
  - In `ol.timeline`, `<small>` before the `strong` labels a point above its date, `li.down` drops one long text to a second level, and `ol.timeline.arrow` ends the line in an arrow.
  - `ul.owners.cards` instead of the plain legend under `ol.journey`: one card per party, `<li><strong>T1A</strong>What it does<a href="https://t1a.com">t1a.com</a></li>` and `li.partner` for the partner, two cards at most.
  - `ul.legend` at the top right explains marks or statuses: `<li><span class="yes"></span>Fully supported</li>`.
  - `table.compare.detail` compares in words: each cell a `<span class="rating"><b>$$$</b>$$</span>` (`b` holds the filled marks; `rating stars` for ★) or a `<strong>` verdict, then a short line. `table.dense` sets a wide plan table in small type.
  - `div.cols` of `figure`s with an `img` and a `figcaption` each shows pictures side by side with centered captions.
  - `table.compare` for options side by side: the options as column heads, the features as rows, and `<span class="yes"></span>`, `<span class="part"></span>` or `<span class="no"></span>` in the cells.
- Use the theme colors in inline SVG and styles through `var(--accent)`, `var(--foreground)`, `var(--muted)`, `var(--surface)` and `var(--border)`, so the slide works in both themes.
- A `<style>` element inside the section applies only to that slide, and its rules win over the built-in styles. Prefer the layouts and building blocks above.
- CSS animations and transitions are allowed; they replay each time the slide is shown. Write the base style as the end state and animate only from the start (`@keyframes x { from { opacity: 0 } }`): the overview, the presenter's preview, print and check mode show slides without animation.
- Builds reveal parts of a slide one click at a time. Use them in decks that someone presents live, so the speaker can talk through a list or a diagram point by point; leave them out of decks that people mostly read on their own. Add `data-step="1"`, `data-step="2"` and so on to the elements to reveal; elements with the same number appear together. A hidden step keeps its space and fades in; to change the effect, style `[data-step-hidden]` (a step not shown yet) and the `transition` of `[data-step]` in the slide's `<style>`; inside SVG, keep waiting steps `visibility: hidden`, or screen readers can read them early. The overview, print and check mode show every step, and check mode reports `steps` per slide.
- Relative paths are relative to `project/`: write `src="assets/chart.png"` for `project/assets/chart.png`. To replace an image, save the new one under a new file name and update the slide; viewers that already have the deck open keep showing a file whose name did not change.
- Slide HTML is shown in several places at once (stage, overview, presenter, print, check), so it must be plain markup; anything interactive goes into an app page (see Interactive slides). The viewer sanitizes slide HTML:
  - `<script>`, `on*` attributes, `javascript:` URLs, forms, `object`, `embed`, SVG animation, `base` and `meta` are removed. Draw charts and diagrams as inline SVG or images.
  - Links may be `https:`, `http:`, `mailto:` or relative. Images, video and other resources load only from `project/` files or `https:` addresses; `<img>` also accepts `data:image/...`.
  - CSS `url()` may point only to `project/` files, `https:` addresses or `data:` images; other declarations, and declarations that use backslash escapes, are dropped; `@import` and linked stylesheets are ignored.
  - An `iframe` may show a page under `project/` or any `https:` page (videos, Excalidraw, Figma, forms). A page from another site stays isolated from the deck and cannot navigate it; a page under `project/` is part of the deck (see Interactive slides). SVG `<use>` may reference only `#id` inside the slide.
  - Check mode lists everything the sanitizer removed.
- Keep each slide to one idea: a heading and at most about six short bullets, one table of up to about seven rows, or one diagram. Split content that does not fit. See "Writing" for how much to put on a slide.

## The t1a template

The `t1a` preset is the T1A corporate template; a t1a deck must look like that template, not like a generic deck.

- Slides are light (`scheme: "light"`). Make the cover dark (`data-layout="title"` with `data-theme="dark"`), and use dark only for the cover, an agenda and a closing statement.
- `data-story="purple"`, `"teal"`, `"blue"` or `"orange"` on a `title` or `section` slide picks its background: on dark a corner glow with line circles, on light pale spheres at the right edge. Purple is the default. Use one story per section and keep it for the section's divider.
- The T1A logo appears at the bottom left of every slide by itself. Do not add it, and do not write the company name as a heading or a footer. In a partner lockup, `<span class="logo"></span>` draws it in the lockup's color.
- Orange is the highlight on light slides only, once per slide: one `strong` in a `statement`, one `.accent` phrase, a `p.callout`. Never write orange text on a dark slide or a dark panel; on dark the accent is teal by itself. Check mode reports `orange-on-dark` as an error.
- Do not use `data-theme="accent"` in t1a: the template has no full orange slide. Use photos (the `image` layout, a picture in `split`, `figure`s, `ul.team`) only when the user gave them; never a placeholder picture. Without photos, choose another layout, or `span.avatar` in `ul.team`.
- Draw product screens for `div.laptop` and `div.window` with `var(--background)`, `var(--surface)` and `var(--border)`, so the screen follows a dark slide.
- Eyebrows, list markers and numbers stay neutral. No italics; bold only for the key point; underline only for links.
- Map the plan blocks to the template's layouts:

| Block | Slide |
|---|---|
| Cover | `title`, dark, H1 and a short `p.lead` |
| Agenda | dark slide with `ol.agenda`, one `li.active`, no heading, `data-footer="off"` |
| Part divider | `section` with a `data-story`, light |
| Company one-pager | `blank` slide with `div.onepager` |
| Product or app with key numbers | `div.showcase`: the h2, a `p.band` caption, 3 stats, the screen on `div.laptop` |
| Mobile app with key numbers | `div.showcase` with `div.phone`: 3 stats on the left, the phone in the middle, a `p.band` and `ul.bars` on the right |
| Project in numbers | `div.stats` with 3 stats, `ul.tags` below |
| Case, or work with a partner | `panel` layout: `div.panel.teal` (Databricks), `.blue` (Azure, Salesforce), `.purple` or `.orange`, holding `<div class="lockup"><span class="logo"></span><span class="x">×</span><span>Partner</span></div>`; then the top cell, `<div><h2>…</h2><ul class="tags">…</ul></div>` with a title of at most about 35 characters (it is set at the template's 144 px) and the tags under it; below the line a short `p`, or `div.cols` with Problem and Solution lists |
| Timeline | `ol.timeline`, 3-6 points |
| Process or journey | `ol.journey`; stages the partner or the client does as `li.partner` (teal) with a `ul.owners` legend; all purple when T1A does everything |
| Options or packages | `div.cards.packages`, 3-4 cards, one `card highlight` (purple) |
| Comparison of options | `table.compare` with yes, part and no marks, at most 3-4 columns, and a `ul.legend` |
| Data table | `table`, at most 3-4 columns; the header row is navy |
| Case with results | `panel` layout with `div.stats` (3 stats) in a `div.panel.teal`, the title and tags, then Problem and Solution in `div.cols` |
| Case on one page | `blank` slide with `div.onepager.case` |
| Similar cases | `div.cases`: the title cell and three tiles, `teal`, `purple` and `gray` |
| Detailed timeline | `ol.timeline.arrow` with `small` labels and at most one `li.down` |
| Journey with the parties | `ol.journey` with `ul.owners.cards` |
| Plan with statuses | `div.gantt` |
| Two or three key points | `ul.points.badges`, each an icon, an `h3` and a short `p` |
| Four to six points | `ul.points`: 4 with an `h3` each, or 6 with a short `p` only |
| List of six | `ol.halves` |
| Team roles | `div.roles`, or `div.roles.left` |
| Picture and text | `split` with the picture first |
| Two pictures | `div.cols` of two `figure`s with captions |
| Photo with a message | `image` layout: the photo, an `h2` and one `p` |
| The team | `ul.team` |
| Clients | `ul.logos.wall` |
| Big screenshot or picture | the `h2` and `img.fill` |
| Comparison in words | `table.compare.detail` with ratings and verdicts, a footnote in `p.small` |
| Plan table with its chart | `table.dense`, an `h4` and an inline SVG chart with `class="grow"` |
| Key message | `statement`, one `strong` phrase |
| Decision or ask | `center` with `p.eyebrow`, `h2` and `p.lead` |

- Tables are the last resort; prefer stats or a chart. Draw charts as inline SVG in `var(--foreground)` with one highlight series in `var(--accent)`.

## Interactive slides

Use an app page for anything that reacts: a poll, a form, a quiz, a small game, a live chart. Inline slide HTML is enough for everything else, including CSS animation and hover effects.

- Write the app as a complete HTML page with its own scripts and styles, for example `project/apps/poll.html`, and embed it: `<iframe src="apps/poll.html" title="Live poll" data-poster="assets/poll.png"></iframe>`. For a full-slide app use `data-layout="blank"` and give the iframe `width: 100%; height: 100%`; inside another layout, give it an explicit `width` and `height` (attributes or style), or it gets the browser default of 300×150.
- The app runs only on the stage and in the presenter's current slide. The overview, print and check mode show the `data-poster` image (optional) in the frame's place. Leaving the slide reloads the app, so keep shared or lasting state in the site's data.
- The app page has the site's own authority and is fully trusted with the deck: it can read and change the deck page and navigate it, so only embed pages you would publish on the site itself. It can load the browser SDK with `<script src="/spot.js"></script>` and use collections, realtime rooms and `spot.me()` as described in the sites Skill (Interactive features). For example, a poll stores each vote with `spot.db.collection("poll").create(...)` and shows results with `subscribe(..., { replay: true })`.
- `/spot.js` exists only on the published site. Under the local preview server the app must still load and say that saving works once published; test the SDK part on the published deck with the user.
- While an app has focus, it gets all key presses. For an app under `project/`, Escape gives the keys back to the deck (an app that uses Escape itself can call `preventDefault()`); for an embedded page from another site, the presenter clicks outside it instead. Say this on the slide if the app uses the keyboard.

## Themes

- `t1a`: Tier One Analytics, built on the corporate presentation template: light slides, navy covers, DM Sans, the T1A logo on every slide. The house theme: use it when the user does not choose, and follow "The t1a template" below.
  - `secondstack`: SecondStack. Gray and cyan, Geist headings with Inter text, flat cards.
  - `lakesentry`: LakeSentry. White slides, navy Outfit titles, Inter text, periwinkle blue; dark is deep navy. Start content slides with a `p.eyebrow` ("The problem"), it sits at the top left and the deck title at the top right. Write `p.lead` as a lavender-gray sentence with the key phrases in `strong`. On the cover, wrap the last line of the `h1` in `span.accent` and add a `div.window` with the product screen last. `em` in a heading is red, for one word; `.good` makes one money number green. The red lighthouse stands at the bottom right of every slide by itself; `<span class="logo">LakeSentry</span>` first on the cover or the closing slide draws the logo, inverted on dark.
  - `antares`: Antares. White slides and Helvetica; `<span class="logo">antares</span>` draws the wordmark in the text color (on the cover put it in the `h1`); a short `p.eyebrow` first on a slide is its label at the top left, and the deck title sits at the top right. `p.lead` and `statement` text is a quiet gray with the key phrases in `strong`; blue marks numbers and charts; the cover and dividers sit on a soft orange-and-blue gradient.
  - `swiss`: minimal Swiss style. Monochrome with one violet accent, tight Inter Tight headings, square corners; section dividers are always dark with a soft gray glow.


The type's themes are in `_type/slides.json` of its viewer files. Each has an `id`, a `title`, a `description` of its colors and fonts, a default `scheme` and a `preview` image (a path under `_type/`); `defaultTheme` is the theme of a deck without `preset`.

- When the user names a theme, or a look that one theme matches, use it.
- For a new deck where the user named none and there is more than one theme, ask before you write. With the `ask_user` tool, offer one option per theme: its `title` as label, its `description`, and an image preview with the path of its preview file in the imported directory (`/workspace/sites/<name>-preview/_type/<preview>`). Without that tool, ask in plain text with each title and description. With one theme, do not ask.
- Write the chosen `id` to `theme.preset`. Do not copy the theme's colors or fonts into `deck.json`. To change the theme of a deck later, change only `theme.preset`.

## Writing

- One idea per slide. The title states the conclusion, not the topic ("Revenue grew in every region", not "Revenue").
- About 25 words of body at most, no filler. Every slide passes "so what?": cut what does not support the title.
- Every number comes with its comparison and its consequence ("42%, up from 31% last year, so renewals now carry growth").
- Show the true number of items: 4 stages stay 4. Choose three only when you pick the arguments yourself. Put at most 6 items on a slide: 2-4 in a row, 5-6 in a 2x3 grid. Group or split more.
- The last slide is the decision or the ask.

## Working with data

- Analyze attached spreadsheets in the workspace with code first: trends, period and segment comparisons, outliers, drivers, shares. Do not write numbers from a glance at the file.
- Let the plan blocks carry the findings of the analysis.
- Slides show conclusions and 1-3 key numbers. Draw charts as inline SVG from the analysis and check them against the source numbers.
- Report contradictions in the data to the user in chat; do not smooth them over on a slide.

## Design rules

Rules from design reviews of generated decks. Check every slide against them before you publish.

1. A chart explains every color it uses. When a chart has more than one series or a highlighted part (for example an optional add-on in `var(--accent)`), add a `ul.legend` that names each color, or label the part directly on the chart. A reader must not have to guess what a color means.
2. Draw a chart the way the template's `table-chart` slide does: an `h4` above it that names the measure and its unit, series labels and gridlines in `var(--muted)` and `var(--border)`, values written at the bars, and `role="img"` with an `aria-label` that says what the chart shows.
3. Copy a template layout with its proportions and its placement: the same cells, the same order, the same alignment. Do not stretch, squeeze or move its parts (for example, the partner case keeps the title and the tags in the top cell and the text in the bottom cell).
4. Keep the template's type sizes. Text in the same role (slide titles, card titles, stats) has the same size on every slide; do not enlarge a title to fill space or shrink it to fit more text: shorten the text instead.
5. In a dark slide or a dark deck, no white or light block stays: cards, tables, panels, screens and drawings use `var(--surface)`, `var(--background)` and `var(--border)`, so they follow the scheme.
6. Use only real brand assets: the marks the theme draws (`span.logo`, the t1a.com globe of `div.onepager`) and the logos the user gives. Never draw an imitation of a logo, a globe or a map, and never add a placeholder picture.
7. Size type for the room. Text a room cannot read from the back is too small; for a workshop or a talk, prefer fewer words in larger type. White space is part of the design: do not stretch blocks or add content only to fill the frame.
8. Vary the layouts. Do not use the same block (for example `ol.steps`) on two slides in a row, and use each block for what it is for: steps only for a real sequence.
9. Builds are the exception. Add `data-step` only to a deck the user says will be presented live, and then only to the one or two slides where the speaker walks through parts; never to every slide.
10. In a product deck, show what the user gets, and put the product's real interface on the slides (a screenshot from the user or a drawn screen in `div.window` or `div.laptop`), not only words about it.
11. Draw arrows and connectors tidy: one stroke width, aligned to the shapes they join, under the shapes, with the tip touching the next shape.

## Build a deck

The package also holds `templates/<theme>/project/`: the designer's original reference decks for all five themes. The t1a library includes 28 corporate slides with panel, timeline, journey, team, comparison and product layouts. Read its `deck.json` and the relevant slide files before adapting those layouts. Publish only the slides needed by the confirmed plan.

1. Call `site_types` with `name="t1a-slides"`. Use the exact `type` it reports, for example `t1a-slides@1.6.6`, in every call below.
2. Call `import_site` with that `type` and a new directory, for example `/workspace/sites/<name>-preview/`, read `_type/slides.json` there and choose the theme (Themes).
3. Plan the deck: the story, the sections and the slide ids, one idea per slide. Start with a `title` slide and end with a closing slide.
4. Write `project/deck.json` with the complete `order` first, then the slide files one by one. The viewer shows a placeholder for each listed slide whose file does not exist yet and fills it when the file appears, so you can publish early and keep writing.
5. Preview and check (below), fix every error, then publish.

## Preview and check

The workspace cannot open the published site. Check the deck locally with the viewer package:

1. Use the directory from Build step 2, or call `import_site` with `type="t1a-slides@1.6.6"` and a new directory, for example `/workspace/sites/<name>-preview/`. It contains `index.html` and `_type/`.
2. Copy the deck data into it, replacing any earlier copy, so deleted files do not linger: `rm -rf /workspace/sites/<name>-preview/project && cp -r /workspace/sites/<name>/project /workspace/sites/<name>-preview/`. Repeat after each change. Never publish the preview directory.
3. Serve it: `python3 -m http.server 8765 --bind 127.0.0.1 --directory /workspace/sites/<name>-preview` in the background.
4. Open `http://127.0.0.1:8765/?check=1` in the workspace browser. Check mode lists every slide with its issues and outlines overflowing elements. When `document.documentElement.dataset.slidesCheck` is `"done"`, the full report is the JSON text of `#slides-check-report` and the `[slides-check]` console line. `ok` is `false` while any error remains. While slides are still missing, the browser console also shows 404 errors for their files; that is expected.
5. Fix each error: `overflow` and `clipped` mean the content does not fit, so shorten it or split the slide; `missing`, `malformed`, `asset-missing`, `asset-timeout` and deck issues name the file to fix; `unknown-preset` means `theme.preset` is not an `id` from `_type/slides.json`. Rerun the check until `ok` is `true` and `complete` is `true`, then look at a few slides in normal mode (`http://127.0.0.1:8765/#<slide-id>`).

## Publish

- Publish the data directory, `/workspace/sites/<name>/`, which holds `project/` and optionally `_spot.json`, with `publish_site(path=..., site=<name>, type="t1a-slides@1.6.6")`. It needs no `index.html`; never include the preview files. Leave `type_target` empty.
- Only files under `project/` and `_spot.json` belong in it. Publishing refuses other files and names the first offending path; every `.json` file must be valid JSON.
- An edit of an existing deck starts with `import_site(site=<name>, path=<empty directory>)`, which reports the exact type to publish with. The owner can also change slide text by hand, and those edits are saved into the slide files, so never edit from an older copy. Edit, check and publish with that `type`. A pin mismatch error (409) means the site now pins another version: import it again and redo the edit there.
- Give the user the link with one sentence on what the deck covers. The presenter view opens with `S`, the overview with `O`, fullscreen with `F`; browser print saves a PDF with one page per slide, and the toolbar's download button a PowerPoint file.

## Starter examples

`_type/starters.json` lists sample decks and the blocks they illustrate. Each entry names its `directory`, cover title and label, block samples and preview images in every theme. When the host supplies a starter id, read that entry, copy its `project/` into the deck data directory, and use its blocks as the editable plan. Keep its cover title and label unless the user requests another title; replace all sample values with the user’s topic and source data. Name the example in your introduction. The host’s Sites Skill defines the theme-question and plan presentation.
