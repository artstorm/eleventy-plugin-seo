import test from "ava";
import Config from "../../src/Config";
import PageDescription from "../../src/Tags/PageDescription";

test.beforeEach(t => {
  t.context.scope = {
    contexts: [
      {
        excerpt: "Excerpt in front matter"
      }
    ]
  };
});

test("A provided excerpt should be used", t => {
  const pageDescription = new PageDescription();
  let description = pageDescription.render("an excerpt");

  t.is(description, "an excerpt");
});

test("When no excerpt should use config description", t => {
  const config = new Config({ description: "Config description" });
  const pageDescription = new PageDescription(config);
  let description = pageDescription.render();

  t.is(description, "Config description");
});

test("Description should be escaped", t => {
  const config = new Config({ description: "Let's escape" });
  const pageDescription = new PageDescription(config);
  let description = pageDescription.render();

  t.is(description, "Let&apos;s escape");
});

test("Liquid engine should provide front matter excerpt", t => {
  // Mock liquid engine scope
  let scope = {
    contexts: [
      {
        excerpt: "Excerpt in front matter"
      }
    ]
  };

  const pageDescription = new PageDescription();

  return pageDescription.liquidRender(scope).then(result => {
    t.is(result, "Excerpt in front matter");
  });
});

test("Nunjucks engine should provide front matter excerpt", t => {
  // Mock nunjucks engine context
  let context = {
    ctx: {
      excerpt: "Excerpt in front matter"
    }
  };

  const pageDescription = new PageDescription();
  let description = pageDescription.nunjucksRender(pageDescription, context);

  t.is(description, "Excerpt in front matter");
});
