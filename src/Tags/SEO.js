const BaseTag = require("./BaseTag");

class SEO extends BaseTag {
  async liquidRender(scope, hash) {
    const template = this.loadTemplate("seo.liquid");
    const parsed = this.engine.parse(template);
    const context =
      typeof scope.contexts === "undefined"
        ? scope.environments
        : scope.contexts[0];
    const rendered = await this.engine.render(parsed, context);

    return Promise.resolve(rendered);
  }

  nunjucksRender(self, context) {
    const template = self.loadTemplate("seo.njk");
    return context.env.renderString(template, context.ctx);
  }
}

module.exports = SEO;
