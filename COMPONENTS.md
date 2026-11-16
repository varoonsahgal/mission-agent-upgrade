# Lab-step components — Mission: Agent Upgrade

All components are styled in `assets/css/style.css`, and their behavior is in `assets/js/main.js` (no build step). On mission pages, paths are relative to `missions/`, so images use `../assets/img/shots/NAME.png`.

Each mission page has a marker inside `<section class="lab" id="lab">`. Replace it with your steps:

```
<!-- LAB-STEPS:m02 -->   (m02, m03, m04, m05, m06, m07, m08, m09, m10)
```

The section's accent color comes from the `--accent` set on `<body>` or `.lab`. Step numbers, bezels, `.ui` dots, and callouts all pick it up automatically.

---

## Steps timeline (auto-numbered 01, 02, …)

```html
<ol class="steps">
  <li class="step">
    <h4>Create the agent</h4>
    <p>Select <span class="ui">Agents</span>, open the <span class="ui">New agent</span> menu, and choose <span class="ui">Agent (Standard)</span>.</p>
    <figure class="shot">
      <img src="../assets/img/shots/lab1-02-name-agent.png" alt="Name your agent dialog" loading="lazy">
      <figcaption>Name the agent <strong>Mission Control</strong>, then select Create.</figcaption>
    </figure>
  </li>
</ol>
```

- The JS automatically wraps each `<img>` in a dark "monitor" bezel with traffic-light dots. Clicking it opens a lightbox (Esc closes it).
- Optional: set `data-label="Overview tab"` on the `<figure>` to replace the bezel title (the default is `copilotstudio.microsoft.com`).
- `<figure class="shot small">` caps the width at 640px, which suits cropped dialogs.

## Callouts

```html
<div class="callout tip"><strong>Pro tip</strong> Text…</div>
<div class="callout warn"><strong>Heads up</strong> Text…</div>
<div class="callout anomaly"><strong>Anomaly detected</strong> Text…</div>
<div class="callout intel"><strong>Intel</strong> Text…</div>
```

## Copy block (adds a Copy button)

```html
<pre class="copy" data-lang="Agent instructions"><code>You are Mission Control…</code></pre>
```

`data-lang` is the small label in the top-left corner. It's optional.

## Prompt bubble (what learners type in the test pane, with a Copy button)

```html
<div class="prompt">Members say QuickPay transfers are stuck in Pending.</div>
<div class="reply">Shares the guidance and references DSI-1042. No new record.</div>   <!-- optional "expected" bubble -->
```

## Checkpoint (checkboxes saved in localStorage, with a progress meter)

```html
<div class="checkpoint">
  <h4>Telemetry check</h4>
  <label><input type="checkbox"> The agent cites the playbook</label>
  <label><input type="checkbox"> The workflow returns an Issue ID</label>
</div>
```

## Inline

```html
<kbd>Ctrl</kbd> + <kbd>S</kbd>      <span class="ui">Save</span>      <code>Topic.Service</code>
```

## Also available

- `<div class="table-wrap"><table>…</table></div>`: styled, scrollable table
- `<span class="sev s1|s2|s3|s4">Sev 1</span>`: severity pills
- `<details class="reveal"><summary>Hint</summary><div class="inner">…</div></details>`: collapsible hint or solution
- `<div class="challenge">…</div>`: hazard-striped challenge box (see m06 for its structure)
- `<h3 id="x" class="toc-include">`: makes an h3 appear in the right-hand TOC (h2s are always included)

---

## Narrative components (pass 2)

### Incoming transmission (opens every briefing)

```html
<div class="tx" role="note">
  <span class="tx-k">Incoming transmission</span>
  <p>“The agent told me to open a ticket. I was asking the agent so I wouldn't have to.”</p>
  <span class="tx-from">— Dana O. · Digital analyst · 09:41 ET</span>
</div>
```

Short, in-universe, one per mission. Facilitators read it aloud. Senders are fictional Contoso staff (Priya N., Dana O., Sam R., Marcus B.).

### Flight rule (closes every briefing)

```html
<aside class="frule" data-n="03" aria-label="Flight rule 03">
  <span class="frule-k">Flight rule 03</span>
  <p>Judgment in the model. Arithmetic in the flow.</p>
  <small>One-sentence elaboration.</small>
</aside>
```

`data-n` is the number shown in the chip. All ten are collected on `resources.html#flight-rules` (the `.frules` list), so update both places if you change one.

### Automatic (no markup needed)

- **Agent systems board**: inserted under `.mhero` on any page with `data-mission`. Edit `BOARD` in `main.js` to change which systems are online / this mission / offline.
- **Prev/next cards**: `.pn a.next` gets a teaser line from `HOOKS` in `main.js`; mission links get a mini patch.
- **Resume CTA**: once any mission is complete, the nav button becomes "Resume Mission 0X →", pointing at the first incomplete mission.
- **Reading bar**: a 3px progress line at the top of mission pages.
- **Lab timer**: the `.lab-head .timer` reads its starting value from the markup (e.g. `25:00`). Click to start or pause, double-click (or press R) to reset. Turns amber in the last 20%, red at zero.
- **Sidebar mission grid**: ten mini patches under the Mission log in the TOC; the current mission is ringed, completed ones glow green.
- **Scroll reveal**: `.tx`, `.frule`, `.analogy`, `.diagram`, `.flow`, `.tiles`, `.challenge`, `.lab`, `.debrief`, `.observer` and `.pn` fade in as they enter the viewport (disabled under prefers-reduced-motion).
