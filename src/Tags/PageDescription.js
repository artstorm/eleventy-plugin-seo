const BaseTag = require("./BaseTag");

class PageDescription extends BaseTag {
  render(excerpt) {
    // Fallback on `description` in config if no excerpt is set for the page.
    const pageDescription = excerpt || this.siteDescription;

    return this.entities.encode(pageDescription);
  }

  liquidRender(scope, hash) {
    // Get excerpt from front matter.
    const excerpt = scope.contexts[0].excerpt;

    return Promise.resolve(this.render(excerpt));
  }

  nunjucksRender(self, context) {
    // Get excerpt from front matter.
    const excerpt = context.ctx.excerpt;

    return self.render(excerpt);
  }
}

module.exports = PageDescription;
