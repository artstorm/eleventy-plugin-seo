const fs = require("fs");
const BaseTag = require("./BaseTag");

class SEO extends BaseTag {
  async liquidRender(scope, hash) {
    const template = fs.readFileSync(
      `${__dirname}/../templates/seo.liquid`,
      "utf-8"
    );

    const parsed = this.engine.parse(template);
    const rendered = await this.engine.render(parsed, scope.contexts[0]);

    return Promise.resolve(rendered);
  }

  nunjucksRender(self, context) {
    const template = fs.readFileSync(
      `${__dirname}/../templates/seo.njk`,
      "utf-8"
    );

    return context.env.renderString(template, context.ctx);
  }
}

module.exports = SEO;
