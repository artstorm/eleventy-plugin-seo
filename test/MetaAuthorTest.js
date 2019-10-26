import test from "ava";
import Config from "../src/Config";
import MetaAuthor from "../src/MetaAuthor";

test.beforeEach(t => {
  t.context.config = new Config({ author: "foo bar" });
  t.context.scope = { contexts: [{}] };
});

test("use site author for ordinary pages", t => {
  const metaAuthor = new MetaAuthor(null, t.context.config);
  const object = metaAuthor.getObject();

  return object.render(t.context.scope).then(result => {
    t.is(result, "foo bar");
  });
});

test("front matter author should override site author", t => {
  const metaAuthor = new MetaAuthor(null, t.context.config);
  const object = metaAuthor.getObject();
  t.context.scope.contexts[0].author = "bar baz";

  return object.render(t.context.scope).then(result => {
    t.is(result, "bar baz");
  });
});
