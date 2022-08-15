const yaml = require('yamljs');

const makeYAMLLoader = (readerSync) => (value, path) => {
  let content = value;

  if (/^([./]?.*)?(\/.*)?\.((yml)|(yaml))$/.test(value)) {
    const source = `${path || ''}${value}`;
    try {
      content = readerSync(source, { encoding: 'utf8' });
    } catch (error) {
      throw new Error(`failed to parse yaml content from the file '${source}': ${error}`);
    }
  }

  try {
    const res = yaml.parse(content);
    if (res === undefined || res === null) {
      throw new Error('content is null');
    }
    return res;
  } catch (error) {
    throw new Error(`yaml input failed to parse YAML content: ${error}`);
  }
};

module.exports = { makeYAMLLoader };
