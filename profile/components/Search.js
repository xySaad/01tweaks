import html, { state } from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
import { onlineUsers, users } from "../../lib/data.js";
const { div, input, span, img, link, button } = html;

export default function Search() {
  const query = state("");
  const contains = state(false);

  return div({ class: "wrapper" }).add(
    link({
      rel: "stylesheet",
      href: URL.parse("../styles.css", import.meta.url),
    }),
    div({ class: "search" }).add(
      input({
        "aria-keyshortcuts": "Ctrl+K",
        class: "search",
        type: "search",
        placeholder: "Search",
        is: { value: query },
      }),
      button({
        hidden: ($) => $(query).length === 0,
        class: "clear-btn",
        textContent: "x",
        onclick: () => (query.value = ""),
      }),
      input({ type: "checkbox", is: { checked: contains } }),
      span({ class: "material-symbols-outlined", textContent: "match_word" })
    ),
    button({
      class: "clear-highlights-btn",
      textContent: "Clear Highlights",
      onclick: clearHighlights,
    }),
    Results(query, contains)
  );
}

const Results = (query, contains) => ($) => {
  const q = $(query);
  const c = $(contains);

  if (q.length < 1) return;
  const filter = c ? "includes" : "startsWith";

  const filtredUsers = $(onlineUsers).filter((u) => u[filter](q));

  const handleImageClick = (username) => {
    const targetImg = document.querySelector(
      `img[alt="${username}"]:not(.results img)`
    );

    if (targetImg) {
      targetImg.scrollIntoView({ behavior: "smooth", block: "center" });
      targetImg.classList.add("highlighted-user");
    }
  };

  return div({ class: "results" }).add(
    ...filtredUsers.map((u) =>
      img({
        alt: u,
        src: URL.createObjectURL(users[u].blob),
        onclick: () => handleImageClick(u),
      })
    )
  );
};

const clearHighlights = () => {
  document.querySelectorAll(".highlighted-user").forEach((el) => {
    el.classList.remove("highlighted-user");
  });
};
