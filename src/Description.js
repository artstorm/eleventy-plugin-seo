const BaseTag = require("./BaseTag");

class Description extends BaseTag {
  render(scope, hash) {
    // Get excerpt from front matter.
    const excerpt = scope.contexts[0].excerpt;

    // Fallback on `description` in config if no excerpt is set for the page.
    const pageDescription = excerpt || this.siteDescription;

    return Promise.resolve(this.entities.encode(pageDescription));
  }
}

module.exports = Description;
