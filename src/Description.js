const BaseTag = require("./BaseTag");
const htmlEntities = require("html-entities").Html5Entities;

class Description extends BaseTag {
  getObject() {
    return {
      render: (scope, hash) => {
        const entities = new htmlEntities();

        // Get excerpt from front matter.
        const excerpt = scope.contexts[0].excerpt;

        // Fallback on `description` in config if no excerpt is set for the page.
        const pageDescription = excerpt || this.description;

        return Promise.resolve(entities.encode(pageDescription));
      }
    };
  }
}

module.exports = Description;
