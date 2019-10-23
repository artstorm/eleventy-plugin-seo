const BaseTag = require("./BaseTag");
const htmlEntities = require("html-entities").Html5Entities;

class Title extends BaseTag {
  getObject() {
    return {
      render: (scope, hash) => {
        const entities = new htmlEntities();

        // Get title from front matter.
        const title = scope.contexts[0].title;

        // Fallback on `title` in config if no title is set for the page.
        const pageTitle = title || this.title;

        return Promise.resolve(entities.encode(pageTitle));
      }
    };
  }
}

module.exports = Title;
