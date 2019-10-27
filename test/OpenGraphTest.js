import test from "ava";
import Config from "../src/Config";
import OpenGraph from "../src/OpenGraph";

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
});

test("generates open graph markup", t => {
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
  const openGraph = new OpenGraph(t.context.liquidEngineMock, config);
  const object = openGraph.getObject();

  return object.render(t.context.scope).then(result => {
    t.truthy(result.template.includes(`og:type`));
  });
});

test("page without image falls back on config image", t => {
  const config = new Config({ image: "foo.jpg" });
  const openGraph = new OpenGraph(t.context.liquidEngineMock, config);
  const object = openGraph.getObject();

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.image, "foo.jpg");
  });
});

test("front matter image overrides config image", t => {
  const config = new Config({ image: "foo.jpg" });
  const openGraph = new OpenGraph(t.context.liquidEngineMock, config);
  const object = openGraph.getObject();
  t.context.scope.contexts[0].image = "bar.jpg";

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.image, "bar.jpg");
  });
});

test("page without ogtype in front matter should use website", t => {
  const config = new Config({});
  const openGraph = new OpenGraph(t.context.liquidEngineMock, config);
  const object = openGraph.getObject();

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.ogtype, "website");
  });
});

test("page with ogtype in front matter should use it", t => {
  const config = new Config({});
  const openGraph = new OpenGraph(t.context.liquidEngineMock, config);
  const object = openGraph.getObject();
  t.context.scope.contexts[0].ogtype = "article";

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.ogtype, "article");
  });
});
