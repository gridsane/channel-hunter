const tagRegexp = /#(\w+)/g;
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
  return tag[0].toLowerCase() + tag.slice(1).replace(
    underscoreRegexp,
    (match, char) => char.toUpperCase()
  );
}
