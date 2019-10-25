const BaseTag = require("./BaseTag");

class Title extends BaseTag {
  getObject() {
    return {
      render: (scope, hash) => this.render(scope, hash)
    };
  }

  render(scope, hash) {
    // Get title from front matter.
    const title = scope.contexts[0].title;

    // Fallback on `title` in config if no title is set for the page.
    let pageTitle = title || this.siteTitle;

    // Add pagination
    const pageNumber = this.keyPathVal(
      scope.contexts[0],
      "pagination.pageNumber",
      0
    );
    if (pageNumber > 0) {
      pageTitle = pageTitle + " Page " + (pageNumber + 1);
    }

    // Append sitename
    if (title && title != this.siteTitle) {
      const divider = this.keyPathVal(this, "options.titleDivider", "|");

      pageTitle = `${pageTitle} ${divider} ${this.siteTitle}`;
    }

    return Promise.resolve(this.entities.encode(pageTitle));
  }
}

module.exports = Title;
