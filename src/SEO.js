const BaseTag = require("./BaseTag");

class SEO extends BaseTag {
  getObject() {
    return {
      parse: (tagToken, remainToken) => {},
      render: async (scope, hash) => {
        const template = `
<link rel="canonical" href="{% canonicalURL %}">
        `;

        const parsed = this.liquidEngine.parse(template);
        const rendered = await this.liquidEngine.render(
          parsed,
          scope.contexts[0]
        );

        return Promise.resolve(rendered);
      }
    };
  }
}

module.exports = SEO;
