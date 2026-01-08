import { Marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import hljs from "https://cdn.skypack.dev/highlight.js";
import { markedHighlight } from "https://cdn.skypack.dev/marked-highlight";

const markedInstance = new Marked(
  markedHighlight((code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  })
);

export { markedInstance as marked };
