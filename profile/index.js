import waitForElement from "../lib/waitElement.js";
import Search from "./components/Search.js";
import { onlineUsers, users } from "../lib/data.js";
const imagePrefix = "https://mapl.zone01oujda.ma/image/map/";

export default function Profile() {
  window.onFetch({
    request: async (ctx) => {
      const url = new URL(ctx.args[0]);
      const href = url.href;

      if (href.startsWith(imagePrefix)) {
        const login = href.substring(imagePrefix.length);
        if (!users[login]) {
          const resp = await window.fetchNoCatch(...ctx.args);
          users[login] = { blob: await resp.blob() };
        }

        ctx.response = new Response(null, { status: 200 });
        ctx.response.blob = () => {
          return users[login].blob;
        };
      }
    },
    response: async ({ args, response }) => {
      const url = new URL(args[0]);
      const href = url.href;
      if (href === "https://mapl.zone01oujda.ma/online") {
        response
          .clone()
          .json()
          .then(async (posts) => {
            onlineUsers.batch(() => {
              onlineUsers.clear();
              for (const post in posts) {
                onlineUsers.push(posts[post]);
              }
            });
          });
      }
    },
  });

  if (location.pathname === "/map") {
    waitForElement(".page_map___E7cR").then((map) => {
      const s = Search();
      map.parentNode.insertBefore(s, map);
      s.mount();
    });
  }
}
