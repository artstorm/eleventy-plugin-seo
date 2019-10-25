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

    // Get options.
    const style = this.keyPathVal(this, "options.titleStyle", "default");
    const divider = this.keyPathVal(this, "options.titleDivider", "-");

    // Fallback on `title` in config if no title is set for the page.
    let pageTitle = title || this.siteTitle;

    // Add pagination
    const pageNumber = this.keyPathVal(
      scope.contexts[0],
      "pagination.pageNumber",
      0
    );
    if (pageNumber > 0) {
      pageTitle = pageTitle + ` ${divider} Page ` + (pageNumber + 1);
    }

    // Append sitename
    // if we have a title available
    // and unless the title already is the sitename
    // and the style is not minimalistic
    if (title && title != this.siteTitle && style != "minimalistic") {
      pageTitle = `${pageTitle} ${divider} ${this.siteTitle}`;
    }

    return Promise.resolve(this.entities.encode(pageTitle));
  }
}

module.exports = Title;
