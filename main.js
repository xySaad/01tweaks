import { hijackObjectURL } from "./lib/blob.js";
import { hijackFetch } from "./lib/fetch.js";
import onRouteChange from "./lib/router.js";
import Profile from "./profile/index.js";
import { Router } from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
Router.prototype.navigate = () => {};
hijackFetch();
hijackObjectURL();

function main() {
  const url = new URL(location.href);
  const [subdomain, domain, tld] = url.host.split(".").slice(-3);

  switch (subdomain) {
    case "profile":
      return Profile();
    case "learn":
      break;
    case "transport":
      break;
    default:
      break;
  }
}

main();

onRouteChange(() => {
  main();
});
