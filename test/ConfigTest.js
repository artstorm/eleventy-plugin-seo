const test = require("ava");
const Config = require("../src/Config");

test("Config gets default values", t => {
  const config = new Config();
  
  t.is("", config.get().url);
});

test("Config can merge deep", t => {
  const config = new Config({ options: { foo: "bar" } });

  t.is("bar", config.get().options.foo);
  t.is("summary", config.get().options.twitterCardType);
});
