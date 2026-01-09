import html from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
import { Input } from "./Input.js";
import { position, children } from "../lib/states.js";
import { navigate } from "../../lib/router.js";
const { div } = html;

export const Search = () => {
  return div({ class: "search" }).add(
    Input(),
    div({
      class: "result",
      hidden: ($) => $(children).length === 0,
    }).add(
      children.map((child, idx) =>
        div({
          "data-focus": ($) => $(position) == idx(),
          class: "child",
          onclick: () => navigate("/intra" + child.path),
          textContent: child.path.substring("/oujda/".length),
        })
      )
    )
  );
};
