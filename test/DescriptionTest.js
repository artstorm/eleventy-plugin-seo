import test from "ava";
import Config from "../src/Config";
import Description from "../src/Description";

test.beforeEach(t => {
  t.context.scope = {
    contexts: [
      {
        excerpt: "Excerpt in front matter"
      }
    ]
  };
});

test("Front matter excerpt should be used", t => {
  const description = new Description();
  const object = description.getObject();

  return object.render(t.context.scope).then(result => {
    t.is(result, "Excerpt in front matter");
  });
});

test("Pages without front matter excerpt should use config description", t => {
  const config = new Config({ description: "Config description" });
  const description = new Description(null, config);
  const object = description.getObject();
  t.context.scope.contexts[0] = {};

  return object.render(t.context.scope).then(result => {
    t.is(result, "Config description");
  });
});
