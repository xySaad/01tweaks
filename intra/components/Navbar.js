import html from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
import { Markdown } from "./markdown/Markdown.js";
import { Search } from "./Search.js";

const { div } = html;

export const Navbar = () => {
  return div({ class: "navbar" }).add(Search(), Markdown());
};
