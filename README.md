# Overview

a script that adds some tweaks to zone01 platforms

# Usage

## Bookmarklet

Create a new bookmark and copy paste the script below as the url, then run it when needed.

```js
javascript: (function () {
  const script = document.createElement("script");
  script.type = "module";
  script.src = "https://xysaad.github.io/01tweaks/main.js";

  const target = document.head || document.documentElement;
  target.appendChild(script);
})();
```

## Tampermonkey

If you want the tweaks to run automatically use the code below as a [Tampermonkey](https://www.tampermonkey.net/) script:

```js
// ==UserScript==
// @name         01tweaks
// @version      2025-12-24
// @description  01tweaks
// @match        https://*.zone01oujda.ma/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

import("https://xysaad.github.io/01tweaks/main.js");
```

# Features and Fixes

## Profile

- add a search bar for online users with highlights

## Intra

- add a quick search bar
- full screen markdown
- responsive design for profile page (/intra/campus/profile)
