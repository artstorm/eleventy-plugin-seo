const test = require("ava");
const Config = require("../../src/Config");
const MetaAuthor = require("../../src/Tags/MetaAuthor");

test.beforeEach(t => {
  t.context.config = new Config({ author: "foo bar" });
  t.context.scope = { contexts: [{}] };
});

test("use site author for ordinary pages", t => {
  const metaAuthor = new MetaAuthor(t.context.config);
  const author = metaAuthor.render();

  t.is(author, "foo bar");
});

test("provided author should override site author", t => {
  const metaAuthor = new MetaAuthor(t.context.config);
  const author = metaAuthor.render("bar baz");

  t.is(author, "bar baz");
});

test("Liquid engine should provide author", t => {
  // Mock liquid engine scope
  let scope = {
    contexts: [
      {
        author: "an author"
      }
    ]
  };

  const metaAuthor = new MetaAuthor(t.context.config);

  return metaAuthor.liquidRender(scope).then(result => {
    t.is(result, "an author");
  });
});

test("Liquid engine should provide author when scope is of type Context", t => {
  // Mock liquid engine scope
  let scope = {
    environments: {
      author: "an author"
    }
  };

  const metaAuthor = new MetaAuthor(t.context.config);

  return metaAuthor.liquidRender(scope).then(result => {
    t.is(result, "an author");
  });
});

test("Nunjucks engine should provide author", t => {
  // Mock nunjucks engine context
  let context = {
    ctx: {
      author: "an author"
    }
  };

  const metaAuthor = new MetaAuthor(t.context.config);
  let author = metaAuthor.nunjucksRender(metaAuthor, context);

  t.is(author, "an author");
});
