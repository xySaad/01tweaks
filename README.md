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

# Tweaks

## Profile

- Search bar:
  - add a quick search for online users using login (username).
  - use (ctrl + /) to open the search bar.
  - multi select users and highlight them in the map.
  
## Intra

- Search bar:
  - add a quick search for any project using it's name.
  - use (ctrl + /) to open the search bar.
- full screen markdown
  - adds an icon to the navbar that opens a the project markdown in a reader-like mode
  - you can read the markdown regardless if you already unlocked the project or not. 
- css
  - slight changes to profile page (/intra/campus/profile); noticeable in small screens.
