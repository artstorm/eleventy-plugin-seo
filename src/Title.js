const BaseTag = require("./BaseTag");

class Title extends BaseTag {
  getObject() {
    return {
      render: (scope, hash) => {
        // Get title from front matter.
        const title = scope.contexts[0].title;

        // Fallback on `title` in config if no title is set for the page.
        let pageTitle = title || this.title;

        // Add pagination
        const pagination = scope.contexts[0].pagination;
        if (pagination && pagination.pageNumber > 0) {
          pageTitle = pageTitle + " Page " + (pagination.pageNumber + 1);
        }

        return Promise.resolve(this.entities.encode(pageTitle));
      }
    };
  }
}

module.exports = Title;
