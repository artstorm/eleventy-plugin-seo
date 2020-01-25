const fs = require("fs");
const BaseTag = require("./BaseTag");

class SEO extends BaseTag {
  async render(scope, hash) {
    const template = fs.readFileSync(
      `${__dirname}/templates/seo.liquid`,
      "utf-8"
    );

    const parsed = this.liquidEngine.parse(template);
    const rendered = await this.liquidEngine.render(parsed, scope.contexts[0]);

    return Promise.resolve(rendered);
  }
}

module.exports = SEO;
