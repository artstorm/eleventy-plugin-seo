import test from "ava";
import Config from "../../src/Config";
import SEO from "../../src/Tags/SEO";

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

test("SEO renders liquid template", t => {
  // Mock LiquidEngine.
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
  const seo = new SEO(config, liquidEngine);
  const object = seo.getLiquidTag();

  object.parse();

  return object.render(t.context.scope).then(result => {
    t.truthy(
      result.includes(`<link rel="canonical" href="{% canonicalURL %}">`)
    );
  });
});

test("SEO renders nunjucks template", t => {
  // Mock nunjucks context
  let contextMock = {
    env: {
      renderString: function(template) {
        return template;
      }
    }
  };
  const seo = new SEO({}, {});

  let render = seo.nunjucksRender(seo, contextMock);

  t.truthy(render.includes(`<title>{% pageTitle "" %}</title>`));
});
