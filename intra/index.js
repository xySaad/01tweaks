import html from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
import waitForElement from "../lib/waitElement.js";
import { OujdaObject } from "./lib/states.js";
import { Profile } from "./profile/Profile.js";
import { Navbar } from "./components/Navbar.js";
const { link } = html;

const navbar = Navbar();
const styles = link({
  rel: "stylesheet",
  href: URL.parse("./styles.css", import.meta.url),
});

export default async function Intra() {
  !styles.isConnected && document.querySelector("head").append(styles);

  if (location.pathname.match(/\/intra\/.+\/profile\/?$/g)) {
    await Profile();
  }

  if (navbar.isConnected) return;
  const resp = await fetch("https://learn.zone01oujda.ma/api/object/oujda");
  const json = await resp.json();
  OujdaObject.children = json.children;

  waitForElement('nav[data-test="navBar"]').then((nav) => {
    nav.insertBefore(navbar, nav.lastChild);
    navbar.mount();
  });
}
