export const getCookie = (key) =>
  Object.fromEntries(document.cookie.split("; ").map((c) => c.split("=")))[key];
