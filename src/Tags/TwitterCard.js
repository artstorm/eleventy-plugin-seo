const BaseTag = require("./BaseTag");

/**
 * @see https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards
 * @see https://cards-dev.twitter.com/validator
 */
class TwitterCard extends BaseTag {
  async liquidRender(scope, hash) {
    const context = typeof scope.contexts === "undefined" ? scope.environments : scope.contexts[0];
    // Fallback on using image in config if available and none is set in front matter.
    const hasConfigImageOnly = !context.image && this.config.image;

    const image = hasConfigImageOnly
      ? this.config.image
      : context.image;

    // Add base url from config to front matter image value
    const baseImage = this.config.url + image;

    // Get twitter username for site from config.
    const siteTwitter =
      !context.siteTwitter && this.config.twitter
        ? this.config.twitter
        : context.siteTwitter;

    // Define and update a new template context
    const templateContext = {
      ...context,
      siteTwitter,
      image: this.useImageWithBaseURL(this.config) ? baseImage : image,
      cardType: this.keyPathVal(this, "options.twitterCardType")
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

    // Get twitter username for site from config.
    const siteTwitter =
      !context.ctx.siteTwitter && self.config.twitter
        ? self.config.twitter
        : context.ctx.siteTwitter;

    // Define and update a new template context
    const templateContext = {
      ...context.ctx,
      siteTwitter,
      image: self.useImageWithBaseURL(self.config) ? baseImage : image,
      cardType: self.keyPathVal(self, "options.twitterCardType")
    };

    const template = self.loadTemplate("twittercard.njk");
    const rendered = context.env.renderString(template, templateContext);

    return rendered;
  }

  /**
   * Determine if Base URL should be prepended to the image.
   *
   * @param {Object} config
   *
   * @return {Bool}
   */
  useImageWithBaseURL(config) {
    return config.url && "options" in config && config.options.imageWithBaseUrl
      ? true
      : false;
  }
}

module.exports = TwitterCard;
