const BaseTag = require("./BaseTag");

/**
 * @see https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards
 * @see https://cards-dev.twitter.com/validator
 */
class TwitterCard extends BaseTag {
  async liquidRender(scope, hash) {
    // Fallback on using image in config if available and none is set in front matter.
    const hasConfigImageOnly = !scope.contexts[0].image && this.config.image;

    const image = hasConfigImageOnly
      ? this.config.image
      : scope.contexts[0].image;

    // Add base url from config to front matter image value
    const baseImage = this.config.url + image;

    // Get and set imageWithBaseUrl option
    const imageWithBaseUrl =
      this.config.url &&
      "options" in this.config &&
      this.config.options.imageWithBaseUrl
        ? true
        : false;

    // Get twitter username for site from config.
    const siteTwitter =
      !scope.contexts[0].siteTwitter && this.config.twitter
        ? this.config.twitter
        : scope.contexts[0].siteTwitter;

    // Define and update a new template context
    const templateContext = {
      ...scope.contexts[0],
      siteTwitter,
      image: imageWithBaseUrl ? baseImage : image
    };

    const source = this.loadTemplate("twittercard.liquid");
    const template = this.engine.parse(source);
    const rendered = await this.engine.render(template, templateContext);

    return Promise.resolve(rendered);
  }

  nunjucksRender(self, context) {
    // Fallback on using image in config if available and none is set in front matter.
    const image =
      !context.ctx.image && self.config.image
        ? self.config.image
        : context.ctx.image;

    // Add base url from config to front matter image value
    const baseImage = self.config.url + image;

    // Get and set imageWithBaseUrl option
    const imageWithBaseUrl =
      self.config.url &&
      "options" in self.config &&
      self.config.options.imageWithBaseUrl
        ? true
        : false;

    // Get twitter username for site from config.
    const siteTwitter =
      !context.ctx.siteTwitter && self.config.twitter
        ? self.config.twitter
        : context.ctx.siteTwitter;

    // Define and update a new template context
    const templateContext = {
      ...context.ctx,
      siteTwitter,
      image: imageWithBaseUrl ? baseImage : image
    };

    const template = self.loadTemplate("twittercard.njk");
    const rendered = context.env.renderString(template, templateContext);

    return rendered;
  }
}

module.exports = TwitterCard;
