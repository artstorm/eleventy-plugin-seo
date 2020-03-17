const test = require("ava");
const BaseTag = require("../../src/Tags/BaseTag");

test("Should have an liquid tag that can call render and parse", t => {
  const tag = new BaseTag();
  const object = tag.getLiquidTag();
  object.parse();
  object.render();

  t.pass();
});

test("Should have an nunjucks tag that can call parse and run", t => {
  // Mock nunjucks enigne
  const nunjucksMock = { runtime: { SafeString: class {} } };
  const parserMock = {
    nextToken: () => {
      return {};
    },
    parseSignature: () => {},
    advanceAfterBlockEnd: () => {}
  };

  const tag = new BaseTag({}, nunjucksMock);
  const object = tag.getNunjucksTag("foo");
  object.parse(parserMock, { CallExtensionAsync: class {} });
  object.run({}, {}, function() {});

  t.pass();
});
