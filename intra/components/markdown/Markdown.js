import html, { state } from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
import { marked } from "./marked.js";
const { div, span } = html;

const hidden = state(true);
const content = state(null);
let lastOpened = "";

export const Markdown = () => {
  return div({ class: "markdown" }).add(
    span({
      class: "material-symbols-outlined",
      textContent: "markdown",
      onclick: fetchMd,
    }),
    div({ class: "markdown-wrap", hidden }).add(
      div({ class: "closer", onclick: () => (hidden.value = true) }),
      div({
        class: "markdown-body content",
        innerHTML: ($) => marked.parse($(content) || ""),
        onupdate: ($el) => {
          console.log($el);

          $el
            .querySelectorAll("pre code")
            .forEach((block) => hljs.highlightElement(block));
        },
      }),

      div({ class: "closer", onclick: () => (hidden.value = true) })
    )
  );
};

const fetchMd = async () => {
  const path = location.pathname.split("/");
  const subject = path[path.length - 1];
  if (lastOpened === subject) {
    hidden.value = false;
    return;
  }

  lastOpened = subject;
  const endpoint = `/api/content/root/01-edu_module/content/${subject}/README.md`;
  const resp = await fetch(location.origin + endpoint);
  content.value = await resp.text();
  hidden.value = false;
};

document.addEventListener("keydown", ({ key }) => {
  if (key === "Escape") {
    hidden.value = true;
  }
});
