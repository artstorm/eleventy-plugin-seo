const test = require("ava");
const Config = require("../../src/Config");
const Canonical = require("../../src/Tags/Canonical");

test.beforeEach(t => {
  t.context.scope = {
    contexts: [
      {
        page: {
          url: "/foo"
        }
      }
    ]
  };

  t.context.nunjucksContextMock = {
    ctx: {
      page: {
        url: "/foo"
      }
    },
    env: {
      renderString: function(template, context) {
        return undefined;
      }
    }
  };
});

test("liquid: canonical url from page url", t => {
  const config = new Config({ url: "https://test.com" });
  const canonical = new Canonical(config, null);
  const object = canonical.getLiquidTag();

  object.parse({ args: "" });

  return object.render(t.context.scope).then(result => {
    t.is(result, "https://test.com/foo");
  });
});

test("nunjucks: canonical url from page url", t => {
  const config = new Config({ url: "https://test.com" });
  const canonical = new Canonical(config);
  let result = canonical.nunjucksRender(
    canonical,
    t.context.nunjucksContextMock
  );

  t.is(result, "https://test.com/foo");
});

test("liquid: canonical url from argument with an url", t => {
  // Mock liquidEngine
  const liquidEngine = {
    evalValue() {
      return null;
    }
  };

  const config = new Config({ url: "https://test.com" });
  const canonical = new Canonical(config, liquidEngine);
  const object = canonical.getLiquidTag();

  object.parse({ args: "/feed.xml" });

  return object.render(t.context.scope).then(result => {
    t.is(result, "https://test.com/feed.xml");
  });
});

test("nunjucks: canonical url from argument with an url", t => {
  const config = new Config({ url: "https://test.com" });
  const canonical = new Canonical(config);
  let result = canonical.nunjucksRender(
    canonical,
    t.context.nunjucksContextMock,
    "/feed.xml"
  );

  t.is(result, "https://test.com/feed.xml");
});

test("liquid: canonical url from argument that resolves", t => {
  // Mock liquidEngine
  const liquidEngine = {
    evalValue() {
      return "/foo";
    }
  };

  const config = new Config({ url: "https://test.com" });
  const canonical = new Canonical(config, liquidEngine);
  const object = canonical.getLiquidTag();

  object.parse({ args: "item.url" });

  return object.render(t.context.scope).then(result => {
    t.is(result, "https://test.com/foo");
  });
});

test("nunjucks: canonical url from argument that resolves", t => {
  // Mock renderString
  const env = {
    renderString: function(template, context) {
      return "/foo";
    }
  };
  t.context.nunjucksContextMock.env = env;

  const config = new Config({ url: "https://test.com" });
  const canonical = new Canonical(config);
  let result = canonical.nunjucksRender(
    canonical,
    t.context.nunjucksContextMock,
    "item.url"
  );

  t.is(result, "https://test.com/foo");
});
