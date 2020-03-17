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

    // Get and set imageWithBaseUrl option
    const imageWithBaseUrl = this.config.url && "options" in this.config && this.config.options.imageWithBaseUrl ? true : false;

    // Default `og:type` to article if none is set
    const ogtype = !scope.contexts[0].ogtype ? "article" : scope.contexts[0].ogtype;

    // Define and update a new template context
    const templateContext = { ...scope.contexts[0], ogtype, image: imageWithBaseUrl ? baseImage : image };

    const source = this.loadTemplate("opengraph.liquid");
    const template = this.engine.parse(source);
    const rendered = await this.engine.render(template, templateContext);

    return Promise.resolve(rendered);
  }

  nunjucksRender(self, context) {
    // Fallback on using image in config if available and none is set in front matter.
    const image = !context.ctx.image && self.config.image ? self.config.image : context.ctx.image;

    // Add base url from config to front matter image value
    const baseImage = self.config.url + image;

    // Get and set imageWithBaseUrl option
    const imageWithBaseUrl = self.config.url && "options" in self.config && self.config.options.imageWithBaseUrl ? true : false;

    // Default `og:type` to article if none is set
    const ogtype = !context.ctx.ogtype ? "article" : context.ctx.ogtype;

    // Define and update a new template context
    const templateContext = { ...context.ctx, ogtype, image: imageWithBaseUrl ? baseImage : image };

    const template = self.loadTemplate("opengraph.njk");
    const rendered = context.env.renderString(template, templateContext);

    return rendered;
  }
}

module.exports = OpenGraph;
