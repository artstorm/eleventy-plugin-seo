const BaseTag = require("./BaseTag");

class SEO extends BaseTag {
  getObject() {
    return {
      parse: (tagToken, remainToken) => {},
      render: async (scope, hash) => {
        const template = `
<title>{% pageTitle %}</title>

<meta name="description" content="{% pageDescription %}">
<meta name="robots" content="{% metaRobots %}">
<meta name="author" content="{% metaAuthor %}">

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
