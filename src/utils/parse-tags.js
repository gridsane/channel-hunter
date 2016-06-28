const tagRegexp = /#([^\s]+)/g;
const underscoreRegexp = /_(\w)/g;

export default function parseTags(text) {
  let tags = [];
  let matches;

  while ((matches = tagRegexp.exec(text)) !== null) {
    const tag = normalizeTag(matches[1]);
    if (!tags.find((t) => t.toLowerCase() === tag.toLowerCase())) {
      tags.push(tag);
    }
  }

  return tags;
}

function normalizeTag(tag) {
  return tag.replace(underscoreRegexp, (match, char) => char.toUpperCase());
}
