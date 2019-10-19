import test from "ava";
import Canonical from "../src/Canonical";

test.before(t => {
  t.context.scope = {
    contexts: [
      {
        site: {
          url: "https://test.com"
        },
        page: {
          url: "/foo"
        }
      }
    ]
  };
});

test("canonical url from page url", t => {
  const canonical = new Canonical();
  const object = canonical.getObject();

  object.parse({ args: "" });

  return object.render(t.context.scope).then(result => {
    t.is(result, "https://test.com/foo");
  });
});

test("canonical url from argument with an url", t => {
  // Mock liquidEngine
  const liquidEngine = { evalValue() { return null; }};

  const canonical = new Canonical(liquidEngine);
  const object = canonical.getObject();

  object.parse({ args: "/feed.xml" });

  return object.render(t.context.scope).then(result => {
    t.is(result, "https://test.com/feed.xml");
  });
});

test("canonical url from argument that liquidEngine resolves", t => {
  // Mock liquidEngine
  const liquidEngine = { evalValue() { return '/foo'; }};

  const canonical = new Canonical(liquidEngine);
  const object = canonical.getObject();

  object.parse({ args: "item.url" });

  return object.render(t.context.scope).then(result => {
    t.is(result, "https://test.com/foo");
  });
});

