import test from "ava";
import Config from "../src/Config";
import SEO from "../src/SEO";

test.before(t => {
  t.context.scope = {
    contexts: [
      {
        page: {
          url: "/foo"
        }
      }
    ]
  };
});

test("SEO renders template", t => {
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

  const config = new Config({ url: "https://test.com" });
  const seo = new SEO(liquidEngine, config);
  const object = seo.getObject();

  object.parse();

  return object.render(t.context.scope).then(result => {
    t.truthy(
      result.includes(`<link rel="canonical" href="{% canonicalURL %}">`)
    );
  });
});
