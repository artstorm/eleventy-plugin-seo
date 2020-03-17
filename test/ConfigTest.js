const test = require("ava");
const Config = require("../src/Config");

test("Config gets default values", t => {
  const config = new Config();

  t.is("", config.get().url);
});
