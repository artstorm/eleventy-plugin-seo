const fs = require("fs");
const BaseTag = require("./BaseTag");

/**
 * @see https://developers.facebook.com/docs/sharing/webmasters/
 * @see https://ogp.me
 */
class OpenGraph extends BaseTag {
  async render(scope, hash) {
    // Fallback on using image in config if available and none is set in front matter.
    const siteImage = this.config.image;
    if (!scope.contexts[0].image && siteImage) {
      scope.contexts[0].image = siteImage;
    }

    // Default `og:type` to article if none is set
    if (!scope.contexts[0].ogtype) {
      scope.contexts[0].ogtype = "article";
    }

    const source = fs.readFileSync(
      `${__dirname}/template/opengraph.liquid`,
      "utf-8"
    );
    const template = this.liquidEngine.parse(source);
    const rendered = await this.liquidEngine.render(
      template,
      scope.contexts[0]
    );

    return Promise.resolve(rendered);
  }
}

module.exports = OpenGraph;
