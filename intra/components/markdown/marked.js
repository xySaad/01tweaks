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

markedInstance.use({
  walkTokens(token) {
    if (token.type === "link" || token.type === "image") {
      const path = location.pathname.split("/");
      let subject = path[path.length - 1];
      if (this.defaults.renderer.options.activeTab === "audit")
        subject += "/audit";

      const endpoint = `/api/content/root/01-edu_module/content/${subject}/`;
      const url = URL.parse(endpoint, location.origin);
      token.href = URL.parse(token.href, url);
    }
  },
});

export { markedInstance as marked };
