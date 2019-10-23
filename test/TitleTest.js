import test from "ava";
import Config from "../src/Config";
import Title from "../src/Title";

test.beforeEach(t => {
  t.context.scope = {
    contexts: [
      {
        title: "Title in front matter"
      }
    ]
  };
});

test("Front matter title should be used", t => {
  const title = new Title();
  const object = title.getObject();

  return object.render(t.context.scope).then(result => {
    t.is(result, "Title in front matter");
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
