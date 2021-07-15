const BaseTag = require("./BaseTag");

class PageTitle extends BaseTag {
  render(title, pageNumber, size) {
    // Get options.
    const style = this.keyPathVal(this, "options.titleStyle", "default");
    const divider = this.keyPathVal(this, "options.titleDivider", "-");

    // Fallback on `title` in config if no title is set for the page.
    let pageTitle = title || this.siteTitle;

    // Showing page numbers?
    const showPages = this.showPageNumbers();

    // Add pagination
    if (showPages && pageNumber > 0 && size > 1) {
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
    const title =
      typeof scope.contexts[0].renderData !== "undefined" &&
      typeof scope.contexts[0].renderData.title !== "undefined"
        ? scope.contexts[0].renderData.title
        : scope.contexts[0].title;

    // Get page number from pagination.
    const pageNumber = this.keyPathVal(
      scope.contexts[0],
      "pagination.pageNumber",
      0
    );

    // Get page size from pagination.
    const size = this.keyPathVal(scope.contexts[0], "pagination.size", 0);

    // Showing page numbers?
    const showPages = this.showPageNumbers(scope.contexts[0].renderData);

    return Promise.resolve(
      showPages
        ? this.render(title, pageNumber, size)
        : this.render(title, 0, 0)
    );
  }

  nunjucksRender(self, context) {
    // Get title from front matter.
    const title =
      typeof context.ctx.renderData !== "undefined" &&
      typeof context.ctx.renderData.title !== "undefined"
        ? context.ctx.renderData.title
        : context.ctx.title;

    // Get page number from pagination.
    const pageNumber = self.keyPathVal(context.ctx, "pagination.pageNumber", 0);

    // Get page size from pagination.
    const size = self.keyPathVal(context.ctx, "pagination.size", 0);

    // Showing page numbers?
    const showPages = self.showPageNumbers(context.ctx.renderData);

    return showPages
      ? self.render(title, pageNumber, size)
      : self.render(title, 0, 0);
  }

  showPageNumbers(renderData) {
    const config = this.config;
    let show = true;

    if (
      typeof config != "undefined" &&
      "options" in config &&
      "showPageNumbers" in config.options
    ) {
      show = config.options.showPageNumbers;
    }

    // page override
    if (typeof renderData !== "undefined" && "showPageNumbers" in renderData) {
      show = renderData.showPageNumbers;
    }

    return show;
  }
}

module.exports = PageTitle;
