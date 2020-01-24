const htmlEntities = require("html-entities").Html5Entities;

class PageTitle {
  constructor(title) {
    this.title = title;

    this.entities = new htmlEntities();
  }

  result() {
    // Get options.
    const style = this.keyPathVal(this, "options.titleStyle", "default");
    const divider = this.keyPathVal(this, "options.titleDivider", "-");

    // Fallback on `title` in config if no title is set for the page.
    // let pageTitle = title || this.siteTitle;
    let pageTitle = this.title || this.siteTitle;

    // Add pagination
    // const pageNumber = this.keyPathVal(
    //   scope.contexts[0],
    //   "pagination.pageNumber",
    //   0
    // );
    const pageNumber = 0;
    if (pageNumber > 0) {
      pageTitle = pageTitle + ` ${divider} Page ` + (pageNumber + 1);
    }

    // Append sitename
    // if we have a title available
    // and unless the title already is the sitename
    // and the style is not minimalistic
    if (this.title && this.title != this.siteTitle && style != "minimalistic") {
      pageTitle = `${pageTitle} ${divider} ${this.siteTitle}`;
    }

    return this.entities.encode(pageTitle);
  }

  keyPathVal(obj, path, defaultValue) {
    try {
      return (
        path.split(".").reduce((res, prop) => res[prop], obj) || defaultValue
      );
    } catch (error) {
      return defaultValue;
    }
  }
}

module.exports = PageTitle;
