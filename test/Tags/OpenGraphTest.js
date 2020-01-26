import test from "ava";
import Config from "../../src/Config";
import OpenGraph from "../../src/Tags/OpenGraph";

test.beforeEach(t => {
  t.context.scope = {
    contexts: [{}]
  };

  t.context.liquidEngineMock = {
    parse(template) {
      return template;
    },
    render(template, contexts) {
      return new Promise(resolve => {
        resolve({ template: template, contexts: contexts });
      });
    }
  };

  t.context.nunjucksContextMock = {
    ctx: {},
    env: {
      renderString: function(template, context) {
        return { template: template, context: context };
      }
    }
  };
});

test("liquid: generates open graph markup", t => {
  // Mock liquidEngine
  const liquidEngine = {
    parse(template) {
      return template;
    },
    render(template, contexts) {
      return new Promise(resolve => {
        resolve(template);
      });
    }
  };

  const config = new Config();
  const openGraph = new OpenGraph(config, t.context.liquidEngineMock);
  const object = openGraph.getLiquidTag();

  return object.render(t.context.scope).then(result => {
    t.truthy(result.template.includes(`og:type`));
  });
});

test("nunjucks: generates open graph markup", t => {
  const config = new Config();
  const openGraph = new OpenGraph(config);
  const result = openGraph.nunjucksRender(
    openGraph,
    t.context.nunjucksContextMock
  );

  t.truthy(result.template.includes("og:type"));
});

test("liquid: page without image falls back on config image", t => {
  const config = new Config({ image: "foo.jpg" });
  const openGraph = new OpenGraph(config, t.context.liquidEngineMock);
  const object = openGraph.getLiquidTag();

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.image, "foo.jpg");
  });
});

test("nunjucks: page without image falls back on config image", t => {
  const config = new Config({ image: "foo.jpg" });
  const openGraph = new OpenGraph(config);
  const result = openGraph.nunjucksRender(
    openGraph,
    t.context.nunjucksContextMock
  );

  t.is(result.context.image, "foo.jpg");
});

test("liquid: front matter image overrides config image", t => {
  const config = new Config({ image: "foo.jpg" });
  const openGraph = new OpenGraph(config, t.context.liquidEngineMock);
  const object = openGraph.getLiquidTag();
  t.context.scope.contexts[0].image = "bar.jpg";

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.image, "bar.jpg");
  });
});

test("nunjucks: front matter image overrides config image", t => {
  const config = new Config({ image: "foo.jpg" });
  const openGraph = new OpenGraph(config);
  t.context.nunjucksContextMock.ctx.image = "bar.jpg";
  const result = openGraph.nunjucksRender(
    openGraph,
    t.context.nunjucksContextMock
  );

  t.is(result.context.image, "bar.jpg");
});

test("liquid: page without ogtype in front matter should use article", t => {
  const config = new Config({});
  const openGraph = new OpenGraph(config, t.context.liquidEngineMock);
  const object = openGraph.getLiquidTag();

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.ogtype, "article");
  });
});

test("nunjucks: page without ogtype in front matter should use article", t => {
  const config = new Config({});
  const openGraph = new OpenGraph(config);
  const result = openGraph.nunjucksRender(
    openGraph,
    t.context.nunjucksContextMock
  );

  t.is(result.context.ogtype, "article");
});

test("liquid: page with ogtype in front matter should use it", t => {
  const config = new Config({});
  const openGraph = new OpenGraph(config, t.context.liquidEngineMock);
  const object = openGraph.getLiquidTag();
  t.context.scope.contexts[0].ogtype = "website";

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.ogtype, "website");
  });
});

test("nunjucks: page with ogtype in front matter should use it", t => {
  const config = new Config({});
  const openGraph = new OpenGraph(config);
  t.context.nunjucksContextMock.ctx.ogtype = "website";
  const result = openGraph.nunjucksRender(
    openGraph,
    t.context.nunjucksContextMock
  );

  t.is(result.context.ogtype, "website");
});
