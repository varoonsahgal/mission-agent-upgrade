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
