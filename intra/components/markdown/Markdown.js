import html, { state } from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
import { marked } from "./marked.js";
const { div, span } = html;

const hidden = state(true);
const content = state("");
const activeTab = state("subject");
const fullScreen = state(false);
const contentCache = {};

export const Markdown = () => {
  const body = div({ class: "markdown-body" });

  fullScreen.register((on) => {
    if (on) {
      body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  return div({ class: "markdown" }).add(
    span({
      class: "material-symbols-outlined",
      textContent: "markdown",
      onclick: fetchMd,
    }),
    div({ class: "markdown-wrap", hidden }).add(
      div({ class: "closer", onclick: () => (hidden.value = true) }),
      body.add(
        Toggle(),
        div({
          class: "content",
          innerHTML: ($) =>
            marked.parse($(content), { activeTab: $(activeTab) }),
        })
      )
    )
  );
};

const Toggle = () => {
  const tab = (name) =>
    div({
      textContent: name,
      active: ($) => $(activeTab) === name,
      onclick: () => {
        activeTab.value = name;
        fetchMd();
      },
    });

  return div({ class: "toggle" }).add(
    tab("subject"),
    tab("audit"),
    span({
      class: "material-symbols-outlined",
      textContent: "expand_content",
      onclick: () => (fullScreen.value = !fullScreen.value),
    })
    // span({ class: "material-symbols-outlined", textContent: "docs" }),
    // span({
    //   class: "material-symbols-outlined",
    //   textContent: "content_paste_search",
    // })
  );
};
const fetchMd = async () => {
  const tab = activeTab.value;
  const path = location.pathname.split("/");
  const subject = path[path.length - 1];
  const cacheKey = `${tab}:${subject}`;

  if (contentCache[cacheKey]) {
    content.value = contentCache[cacheKey];
    hidden.value = false;
    return;
  }

  const targetMd = tab === "audit" ? subject + "/audit" : subject;
  const endpoint = `/api/content/root/01-edu_module/content/${targetMd}/README.md`;
  const resp = await fetch(location.origin + endpoint);
  const text = await resp.text();

  contentCache[cacheKey] = text;
  content.value = text;
  hidden.value = false;
};

document.addEventListener("keydown", ({ key }) => {
  if (key === "Escape") {
    hidden.value = true;
  }
});
