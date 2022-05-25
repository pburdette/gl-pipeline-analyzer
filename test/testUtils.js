const trimText = (str) =>
  str
    .replace(/\r?\n|\r/g, '')
    .replace(/\s\s+/g, ' ')
    .trim();

exports.trimText = trimText;
