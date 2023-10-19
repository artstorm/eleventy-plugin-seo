const test = require("ava");
const Config = require("../../src/Config");
const TwitterCard = require("../../src/Tags/TwitterCard");

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

test("liquid: page without image falls back on config image", t => {
  const config = new Config({ image: "foo.jpg" });
  const twitterCard = new TwitterCard(config, t.context.liquidEngineMock);
  const object = twitterCard.getLiquidTag();

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.image, "foo.jpg");
  });
});

test("liquid: page without image falls back on config image when scope is of type Context", t => {
  t.context.scope = {
    environments: {}
  };
  const config = new Config({ image: "foo.jpg" });
  const twitterCard = new TwitterCard(config, t.context.liquidEngineMock);
  const object = twitterCard.getLiquidTag();

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.image, "foo.jpg");
  });
});

test("nunjucks: page without image falls back on config image", t => {
  const config = new Config({ image: "foo.jpg" });
  const twitterCard = new TwitterCard(config);
  const result = twitterCard.nunjucksRender(
    twitterCard,
    t.context.nunjucksContextMock
  );

  t.is(result.context.image, "foo.jpg");
});

test("liquid: front matter image overrides config image", t => {
  const config = new Config({ image: "foo.jpg" });
  const twitterCard = new TwitterCard(config, t.context.liquidEngineMock);
  const object = twitterCard.getLiquidTag();
  t.context.scope.contexts[0].image = "bar.jpg";

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.image, "bar.jpg");
  });
});

test("nunjucks: front matter image overrides config image", t => {
  const config = new Config({ image: "foo.jpg" });
  const twitterCard = new TwitterCard(config);
  t.context.nunjucksContextMock.ctx.image = "bar.jpg";
  const result = twitterCard.nunjucksRender(
    twitterCard,
    t.context.nunjucksContextMock
  );

  t.is(result.context.image, "bar.jpg");
});

test("liquid: no twitter in config should not generate site:twitter", t => {
  const config = new Config({});
  const twitterCard = new TwitterCard(config, t.context.liquidEngineMock);
  const object = twitterCard.getLiquidTag();

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.siteTwitter, undefined);
  });
});

test("nunjucks: no twitter in config should not generate site:twitter", t => {
  const config = new Config({});
  const twitterCard = new TwitterCard(config);
  const result = twitterCard.nunjucksRender(
    twitterCard,
    t.context.nunjucksContextMock
  );

  t.is(result.context.siteTwitter, undefined);
});

test("liquid: twitter in config should generate site:twitter", t => {
  const config = new Config({ twitter: "foo" });
  const twitterCard = new TwitterCard(config, t.context.liquidEngineMock);
  const object = twitterCard.getLiquidTag();

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.siteTwitter, "foo");
  });
});

test("nunjucks: twitter in config should generate site:twitter", t => {
  const config = new Config({ twitter: "foo" });
  const twitterCard = new TwitterCard(config);
  const result = twitterCard.nunjucksRender(
    twitterCard,
    t.context.nunjucksContextMock
  );

  t.is(result.context.siteTwitter, "foo");
});

test("liquid: image set in config with imageWithBaseUrl set to false should be equal to config image value", t => {
  const config = new Config({
    options: { imageWithBaseUrl: false },
    image: "bar.jpg"
  });
  const twitterCard = new TwitterCard(config, t.context.liquidEngineMock);
  const object = twitterCard.getLiquidTag();

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.image, "bar.jpg");
  });
});

test("nunjucks: image set in config with imageWithBaseUrl set to false should be equal to config image value", t => {
  const config = new Config({
    options: { imageWithBaseUrl: false },
    image: "bar.jpg"
  });
  const twitterCard = new TwitterCard(config);

  const result = twitterCard.nunjucksRender(
    twitterCard,
    t.context.nunjucksContextMock
  );

  t.is(result.context.image, "bar.jpg");
});

test("liquid: image set in front matter with imageWithBaseUrl set to false should be equal to front matter image value", t => {
  const config = new Config({ options: { imageWithBaseUrl: false } });
  const twitterCard = new TwitterCard(config, t.context.liquidEngineMock);
  const object = twitterCard.getLiquidTag();
  t.context.scope.contexts[0].image = "foo.jpg";

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.image, "foo.jpg");
  });
});

test("nunjucks: image set in front matter with imageWithBaseUrl set to false should be equal to front matter image value", t => {
  const config = new Config({ options: { imageWithBaseUrl: false } });
  const twitterCard = new TwitterCard(config);
  t.context.nunjucksContextMock.ctx.image = "foo.jpg";
  const result = twitterCard.nunjucksRender(
    twitterCard,
    t.context.nunjucksContextMock
  );

  t.is(result.context.image, "foo.jpg");
});

test("liquid: image set in config with imageWithBaseUrl set to true should be equal to config url + config image values", t => {
  const config = new Config({
    options: { imageWithBaseUrl: true },
    image: "/bar.jpg",
    url: "https://example.com"
  });
  const twitterCard = new TwitterCard(config, t.context.liquidEngineMock);
  const object = twitterCard.getLiquidTag();

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.image, "https://example.com/bar.jpg");
  });
});

test("nunjucks: image set in config with imageWithBaseUrl set to true should be equal to config url + config image values", t => {
  const config = new Config({
    options: { imageWithBaseUrl: true },
    image: "/bar.jpg",
    url: "https://example.com"
  });
  const twitterCard = new TwitterCard(config);

  const result = twitterCard.nunjucksRender(
    twitterCard,
    t.context.nunjucksContextMock
  );

  t.is(result.context.image, "https://example.com/bar.jpg");
});

test("liquid: image set in front matter with imageWithBaseUrl set to true should be equal to config url + front matter image values", t => {
  const config = new Config({
    options: { imageWithBaseUrl: true },
    url: "https://example.com"
  });
  const twitterCard = new TwitterCard(config, t.context.liquidEngineMock);
  const object = twitterCard.getLiquidTag();
  t.context.scope.contexts[0].image = "/foo.jpg";

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.image, "https://example.com/foo.jpg");
  });
});

test("nunjucks: image set in front matter with imageWithBaseUrl set to true should be equal to config url + front matter image values", t => {
  const config = new Config({
    options: { imageWithBaseUrl: true },
    url: "https://example.com"
  });
  const twitterCard = new TwitterCard(config);
  t.context.nunjucksContextMock.ctx.image = "/foo.jpg";
  const result = twitterCard.nunjucksRender(
    twitterCard,
    t.context.nunjucksContextMock
  );

  t.is(result.context.image, "https://example.com/foo.jpg");
});

test("liquid: card type should be set to summary by default", t => {
  const config = new Config();
  const twitterCard = new TwitterCard(config);
  const result = twitterCard.nunjucksRender(
    twitterCard,
    t.context.nunjucksContextMock
  );

  t.log(result);

  t.is(result.context.cardType, "summary");
});

test("nunjucks: liquid: card type should be set to summary by default", t => {
  const config = new Config();
  const twitterCard = new TwitterCard(config);
  const result = twitterCard.nunjucksRender(
    twitterCard,
    t.context.nunjucksContextMock
  );

  t.is(result.context.cardType, "summary");
});

test("liquid: card type should be set to summary_large_image", t => {
  const config = new Config({
    options: { twitterCardType: "summary_large_image" }
  });
  const twitterCard = new TwitterCard(config);
  const result = twitterCard.nunjucksRender(
    twitterCard,
    t.context.nunjucksContextMock
  );

  t.log(result);

  t.is(result.context.cardType, "summary_large_image");
});

test("nunjucks: liquid: card type should be set to summary_large_image", t => {
  const config = new Config({
    options: { twitterCardType: "summary_large_image" }
  });
  const twitterCard = new TwitterCard(config);
  const result = twitterCard.nunjucksRender(
    twitterCard,
    t.context.nunjucksContextMock
  );

  t.is(result.context.cardType, "summary_large_image");
});
