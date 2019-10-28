import test from "ava";
import Config from "../src/Config";
import TwitterCard from "../src/TwitterCard";

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

test("page without image falls back on config image", t => {
  const config = new Config({ image: "foo.jpg" });
  const twitterCard = new TwitterCard(t.context.liquidEngineMock, config);
  const object = twitterCard.getObject();

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.image, "foo.jpg");
  });
});

test("front matter image overrides config image", t => {
  const config = new Config({ image: "foo.jpg" });
  const twitterCard = new TwitterCard(t.context.liquidEngineMock, config);
  const object = twitterCard.getObject();
  t.context.scope.contexts[0].image = "bar.jpg";

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.image, "bar.jpg");
  });
});

test("no twitter in config should not generate site:twitter", t => {
  const config = new Config({});
  const twitterCard = new TwitterCard(t.context.liquidEngineMock, config);
  const object = twitterCard.getObject();

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.siteTwitter, undefined);
  });
});

test("twitter in config should generate site:twitter", t => {
  const config = new Config({ twitter: "foo" });
  const twitterCard = new TwitterCard(t.context.liquidEngineMock, config);
  const object = twitterCard.getObject();

  return object.render(t.context.scope).then(result => {
    t.is(result.contexts.siteTwitter, "foo");
  });
});
