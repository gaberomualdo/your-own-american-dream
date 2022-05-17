import config from "./config";

export function classes(...x) {
  return x.join(" ");
}
export function makeTitle(title) {
  if (title.length === 0) return config.name;
  return `${title} • ${config.name}`;
}

export const formatNum = (n) =>
  n.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
