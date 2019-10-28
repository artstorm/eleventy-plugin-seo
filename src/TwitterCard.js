const fs = require("fs");
const BaseTag = require("./BaseTag");

/**
 * @see https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards
 * @see https://cards-dev.twitter.com/validator
 */
class TwitterCard extends BaseTag {
  async render(scope, hash) {
    // Set image.
    scope = this.image(scope);

    // Get twitter username for site from config.
    if (this.config.twitter) {
      scope.contexts[0].siteTwitter = this.config.twitter;
    }

    const source = fs.readFileSync(
      `${__dirname}/template/twittercard.liquid`,
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

module.exports = TwitterCard;
