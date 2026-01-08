import html from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
import waitForElement from "../lib/waitElement.js";
import { OujdaObject } from "./lib/states.js";
import { Markdown } from "./components/markdown/Markdown.js";
import { Search } from "./components/Search.js";

const { div } = html;

const Navbar = () => {
  return div({ class: "navbar" }).add(Search(), Markdown());
};

export default async function Intra() {
  if (document.querySelector('nav[data-test="navBar"] .search')) {
    return;
  }

  const resp = await fetch("https://learn.zone01oujda.ma/api/object/oujda");
  const json = await resp.json();
  OujdaObject.children = json.children;
  waitForElement('nav[data-test="navBar"]').then((nav) => {
    const s = Navbar();
    nav.insertBefore(s, nav.lastChild);
    s.mount();
  });
}
