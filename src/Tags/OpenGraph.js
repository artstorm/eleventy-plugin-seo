const BaseTag = require("./BaseTag");

/**
 * @see https://developers.facebook.com/docs/sharing/webmasters/
 * @see https://ogp.me
 */
class OpenGraph extends BaseTag {
  async liquidRender(scope, hash) {
    // Fallback on using image in config if available and none is set in front matter.
    const hasConfigImageOnly = !scope.contexts[0].image && this.config.image;

    const image = hasConfigImageOnly
      ? this.config.image
      : scope.contexts[0].image;

    // Add base url from config to front matter image value
    const baseImage = this.config.url + image;

    // Default `og:type` to article if none is set
    const ogtype = !scope.contexts[0].ogtype
      ? "article"
      : scope.contexts[0].ogtype;

    // Define and update a new template context
    const templateContext = {
      ...scope.contexts[0],
      ogtype,
      image: this.useImageWithBaseURL(this.config) ? baseImage : image
    };

    const source = this.loadTemplate("opengraph.liquid");
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

    // Default `og:type` to article if none is set
    const ogtype = !context.ctx.ogtype ? "article" : context.ctx.ogtype;

    // Define and update a new template context
    const templateContext = {
      ...context.ctx,
      ogtype,
      image: self.useImageWithBaseURL(self.config) ? baseImage : image
    };

    const template = self.loadTemplate("opengraph.njk");
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

module.exports = OpenGraph;
