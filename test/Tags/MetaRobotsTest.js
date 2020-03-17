const test = require("ava");
const MetaRobots = require("../../src/Tags/MetaRobots");

test("Ordinary pages gets index and follow", t => {
  const metaRobots = new MetaRobots();
  const robots = metaRobots.render();

  t.is(robots, "index,follow");
});

test("Paginated pages gets noindex and follow", t => {
  const metaRobots = new MetaRobots();
  const robots = metaRobots.render(1);

  t.is(robots, "noindex,follow");
});

test("Missing pagination gets index and follow", t => {
  const metaRobots = new MetaRobots();
  const robots = metaRobots.render();

  t.is(robots, "index,follow");
});

test("Liquid engine should provide pagination for robots", t => {
  // Mock liquid engine scope
  let scope = {
    contexts: [
      {
        pagination: { pageNumber: 1 }
      }
    ]
  };

  const metaRobots = new MetaRobots();

  return metaRobots.liquidRender(scope).then(result => {
    t.is(result, "noindex,follow");
  });
});

test("Nunjucks engine should provide pagination for robots", t => {
  // Mock nunjucks engine context
  let context = {
    ctx: {
      pagination: { pageNumber: 1 }
    }
  };

  const metaRobots = new MetaRobots();
  let robots = metaRobots.nunjucksRender(metaRobots, context);

  t.is(robots, "noindex,follow");
});
