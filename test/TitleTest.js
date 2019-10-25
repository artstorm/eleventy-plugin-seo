import test from "ava";
import Config from "../src/Config";
import Title from "../src/Title";

test.beforeEach(t => {
  t.context.config = new Config({ title: "Site title" });

  t.context.scope = {
    contexts: [
      {
        title: "Title in front matter"
      }
    ]
  };
});

test("Front matter title should be used", t => {
  const title = new Title(null, t.context.config);
  const object = title.getObject();

  return object.render(t.context.scope).then(result => {
    t.is(result, "Title in front matter | Site title");
  });
});

test("Pages without front matter title should use config title", t => {
  const config = new Config({ title: "Config title" });
  const title = new Title(null, config);
  const object = title.getObject();
  t.context.scope.contexts[0] = {};

  return object.render(t.context.scope).then(result => {
    t.is(result, "Config title");
  });
});

test("Title should be escaped", t => {
  const config = new Config({ title: "Let's escape" });
  const title = new Title(null, config);
  const object = title.getObject();
  t.context.scope.contexts[0] = {};

  return object.render(t.context.scope).then(result => {
    t.is(result, "Let&apos;s escape");
  });
});

test("Page and pagenumber should be added on paginated pages", t => {
  const title = new Title(null, t.context.config);
  const object = title.getObject();
  t.context.scope.contexts[0].pagination = { pageNumber: 1 };

  return object.render(t.context.scope).then(result => {
    t.is(result, "Title in front matter Page 2 | Site title");
  });
});

test("Page and pagenumber should not be added on paginated pages with pageNumber 0", t => {
  const title = new Title(null, t.context.config);
  const object = title.getObject();
  t.context.scope.contexts[0].pagination = { pageNumber: 0 };

  return object.render(t.context.scope).then(result => {
    t.is(result, "Title in front matter | Site title");
  });
});
