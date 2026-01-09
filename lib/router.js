import { state } from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
const pathName = () => location.pathname.replace(/\/+$/, "") || "/";
const ParameterStates = new Map();

export const getParam = (param) => {
  const currentParams = new URLSearchParams(location.search);
  const paramState = state(currentParams.get(param));
  ParameterStates.set(param, paramState);
  return paramState;
};

const updateParams = () => {
  const currentParams = new URLSearchParams(location.search);
  currentParams.forEach((v, k) => {
    const paramState = ParameterStates.get(k);
    if (!paramState) return;
    paramState.value = v;
  });
};

export function onRouteChange(cb) {
  let last = pathName();

  const check = () => {
    if (pathName() !== last) {
      last = pathName();
      cb(last);
    }
  };

  const push = history.pushState;
  history.pushState = function () {
    push.apply(this, arguments);
    updateParams();
    check();
  };

  const replace = history.replaceState;
  history.replaceState = function () {
    replace.apply(this, arguments);
    updateParams();
    check();
  };

  window.addEventListener("popstate", check);
}

export const navigate = (path) => {
  window.history.pushState({}, "", path);
  const navEvent = new PopStateEvent("popstate");
  window.dispatchEvent(navEvent);
};
