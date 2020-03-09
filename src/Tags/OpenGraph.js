const BaseTag = require("./BaseTag");

/**
 * @see https://developers.facebook.com/docs/sharing/webmasters/
 * @see https://ogp.me
 */
class OpenGraph extends BaseTag {
  async liquidRender(scope, hash) {
    // Fallback on using image in config if available and none is set in front matter.
    if (!scope.contexts[0].image && this.config.image) {
      scope.contexts[0].image = this.config.image;
    }

    // Add base url from config to front matter image value
    scope.contexts[0].image = this.config.url + scope.contexts[0].image;

    // Default `og:type` to article if none is set
    if (!scope.contexts[0].ogtype) {
      scope.contexts[0].ogtype = "article";
    }

    const source = this.loadTemplate("opengraph.liquid");
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

    // Default `og:type` to article if none is set
    if (!context.ctx.ogtype) {
      context.ctx.ogtype = "article";
    }

    const template = self.loadTemplate("opengraph.njk");
    const rendered = context.env.renderString(template, context.ctx);

    return rendered;
  }
}

module.exports = OpenGraph;
