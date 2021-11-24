<template>
  <router-view />
</template>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

// Body
//
// 1. Remove the margin in all browsers.
// 2. As a best practice, apply a default `background-color`.
// 3. Prevent adjustments of font size after orientation changes in iOS.
// 4. Change the default tap highlight to be completely transparent in iOS.

body {
  margin: 0; // 1
  font-size: 1rem;
  color: black;
  background-color: white; // 2
  -webkit-text-size-adjust: 100%; // 3
  -webkit-tap-highlight-color: rgba(black, 0); // 4
}

p {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

a {
  // color: $link-color;
  // text-decoration: $link-decoration;

  &:hover {
    // color: $link-hover-color;
    // text-decoration: $link-hover-decoration;
  }
}

// And undo these styles for placeholder links/named anchors (without href).
// It would be more straightforward to just use a[href] in previous block, but that
// causes specificity issues in many other styles that are too complex to fix.
// See https://github.com/twbs/bootstrap/issues/19402

a:not([href]):not([class]) {
  &,
  &:hover {
    color: inherit;
    text-decoration: none;
  }
}

// Remove the default `border-radius` that macOS Chrome adds.
// See https://github.com/twbs/bootstrap/issues/24093

button {
  // stylelint-disable-next-line property-disallowed-list
  border-radius: 0;
}

// Explicitly remove focus outline in Chromium when it shouldn't be
// visible (e.g. as result of mouse click or touch tap). It already
// should be doing this automatically, but seems to currently be
// confused and applies its very visible two-tone outline anyway.

button:focus:not(:focus-visible) {
  outline: 0;
}

// Remove the inheritance of text transform in Firefox
button,
select {
  text-transform: none;
}
// Set the cursor for non-`<button>` buttons
//
// Details at https://github.com/twbs/bootstrap/pull/30562
[role='button'] {
  cursor: pointer;
}

select {
  // Remove the inheritance of word-wrap in Safari.
  // See https://github.com/twbs/bootstrap/issues/24990
  word-wrap: normal;

  // Undo the opacity change from Chrome
  &:disabled {
    opacity: 1;
  }
}

// Remove the dropdown arrow in Chrome from inputs built with datalists.
// See https://stackoverflow.com/a/54997118

[list]::-webkit-calendar-picker-indicator {
  display: none;
}

// 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`
//    controls in Android 4.
// 2. Correct the inability to style clickable types in iOS and Safari.
// 3. Opinionated: add "hand" cursor to non-disabled button elements.

button,
[type="button"], // 1
[type="reset"],
[type="submit"] {
  -webkit-appearance: button; // 2
}

// Remove inner border and padding from Firefox, but don't restore the outline like Normalize.

::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

// 1. only resize vertically so they don't break their (horizontal) containers.

textarea {
  resize: vertical; // 1
}

// 1. Browsers set a default `min-width: min-content;` on fieldsets,
//    unlike e.g. `<div>`s, which have `min-width: 0;` by default.
//    So we reset that to ensure fieldsets behave more like a standard block element.
//    See https://github.com/twbs/bootstrap/issues/12359
//    and https://html.spec.whatwg.org/multipage/#the-fieldset-and-legend-elements
// 2. Reset the default outline behavior of fieldsets so they don't affect page layout.

fieldset {
  min-width: 0; // 1
  padding: 0; // 2
  margin: 0; // 2
  border: 0; // 2
}

// 1. Inherit font family and line height for file input buttons
// 2. Correct the inability to style clickable types in iOS and Safari.

::file-selector-button {
  font: inherit; // 1
  -webkit-appearance: button; // 2
}

// Remove border from iframe

iframe {
  border: 0;
}

[hidden] {
  display: none !important;
}

:root {
  --color-primary: indigo;
  --color-accent: green;
  --color-base: grey;
  --color-light: white;
  --color-dark: black;
}

.theme--default {
}
</style>
