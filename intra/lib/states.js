import { state, list } from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
const OujdaObject = {
  children: null,
};

const position = state(0);
const children = list([]);
const query = state("");
query.register((v) => {
  children.batch(() => {
    children.clear();
    children.push(...findChild(v, OujdaObject.children));
  });
});

const findChild = (name, data) => {
  if (name.length < 1) return [];
  const results = [];
  for (const key in data) {
    if (key.replaceAll("-", "").includes(name.replaceAll(" ", ""))) {
      results.push(data[key]);
    }
    if (data[key].children) {
      results.push(...findChild(name, data[key].children));
    }
  }

  return results.sort(({ name: a }, { name: b }) => {
    if (name === a) {
      return -1;
    }
    if (name === b) {
      return 1;
    }
    if (a.startsWith(name)) {
      return -1;
    }
    if (b.startsWith(name)) {
      return 1;
    }
  });
};

export { OujdaObject, position, children, query };
