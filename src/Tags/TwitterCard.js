const BaseTag = require("./BaseTag");

/**
 * @see https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards
 * @see https://cards-dev.twitter.com/validator
 */
class TwitterCard extends BaseTag {
  async liquidRender(scope, hash) {
    // Fallback on using image in config if available and none is set in front matter.
    if (!scope.contexts[0].image && this.config.image) {
      scope.contexts[0].image = this.config.image;
    }

    // Add base url from config to front matter image value
    scope.contexts[0].image = this.config.url + scope.contexts[0].image;

    // Get twitter username for site from config.
    if (this.config.twitter) {
      scope.contexts[0].siteTwitter = this.config.twitter;
    }

    const source = this.loadTemplate("twittercard.liquid");
    const template = this.engine.parse(source);
    const rendered = await this.engine.render(template, scope.contexts[0]);

    return Promise.resolve(rendered);
  }

  nunjucksRender(self, context) {
    // Fallback on using image in config if available and none is set in front matter.
    if (!context.ctx.image && self.config.image) {
      context.ctx.image = self.config.image;
    }

    // Add base url from config to front matter image value
    context.ctx.image = self.config.url + context.ctx.image;

    // Get twitter username for site from config.
    if (self.config.twitter) {
      context.ctx.siteTwitter = self.config.twitter;
    }

    const template = self.loadTemplate("twittercard.njk");
    const rendered = context.env.renderString(template, context.ctx);

    return rendered;
  }
}

module.exports = TwitterCard;
