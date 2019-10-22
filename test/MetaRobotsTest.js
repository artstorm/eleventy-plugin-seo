import test from "ava";
import MetaRobots from "../src/MetaRobots";

test.beforeEach(t => {
  t.context.scope = {
    contexts: [
      {
        pagination: {
          pageNumber: 0
        }
      }
    ]
  };
});

test("Ordinary pages gets index and follow", t => {
  const metaRobots = new MetaRobots();
  const object = metaRobots.getObject();

  return object.render(t.context.scope).then(result => {
    t.is(result, "index,follow");
  });
});

test("Ordinary pages gets noindex and follow", t => {
  const metaRobots = new MetaRobots();
  const object = metaRobots.getObject();
  t.context.scope.contexts[0].pagination.pageNumber = 1;

  return object.render(t.context.scope).then(result => {
    t.is(result, "noindex,follow");
  });
});

test("Missing pagination gets index and follow", t => {
  const metaRobots = new MetaRobots();
  const object = metaRobots.getObject();

  return object.render({ contexts: [{}] }).then(result => {
    t.is(result, "index,follow");
  });
});
