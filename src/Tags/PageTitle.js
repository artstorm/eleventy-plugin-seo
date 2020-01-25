const BaseTag = require("./BaseTag");

class PageTitle extends BaseTag {
  render(title, pageNumber) {
    // Get options.
    const style = this.keyPathVal(this, "options.titleStyle", "default");
    const divider = this.keyPathVal(this, "options.titleDivider", "-");

    // Fallback on `title` in config if no title is set for the page.
    let pageTitle = title || this.siteTitle;

    // Add pagination
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

    return this.entities.encode(pageTitle);
  }

  liquidRender(scope, hash) {
    // Get title from front matter.
    const title = scope.contexts[0].excerpt;

    // Get page number from pagination.
    const pageNumber = this.keyPathVal(
      scope.contexts[0],
      "pagination.pageNumber",
      0
    );

    return Promise.resolve(this.render(title, pageNumber));
  }

  nunjucksRender(self, context) {
    // Get title from front matter.
    const title = context.ctx.title;

    // Get page number from pagination.
    const pageNumber = self.keyPathVal(context.ctx, "pagination.pageNumber", 0);

    return self.render(title, pageNumber);
  }
}

module.exports = PageTitle;
