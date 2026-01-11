import { state } from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
import { fullScreen, hidden } from "../intra/components/markdown/Markdown.js";
const searchKey = state(false);

// TODO: creaet an accessibilty service
document.addEventListener("keydown", ({ key, ctrlKey, altKey }) => {
  if (key.toLowerCase() === "m" && altKey) {
    hidden.value = !hidden.value;
  }
  if (key.toLowerCase() === "f" && !hidden.value) {
    fullScreen.value = !fullScreen.value;
  }

  if (key === "Escape") {
    searchKey.value = false;
    hidden.value = true;
  }

  if (ctrlKey && key === "/") {
    searchKey.value = true;
  }
});

export { searchKey };
