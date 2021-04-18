const BaseTag = require("./BaseTag");

class MetaRobots extends BaseTag {
  render(pageNumber, size) {
    let robots = "index,follow";

    if (pageNumber > 0 && size > 1) {
      robots = `no${robots}`;
    }

    return robots;
  }

  liquidRender(scope, hash) {
    // Get page number from pagination.
    const pageNumber = this.keyPathVal(
      scope.contexts[0],
      "pagination.pageNumber",
      0
    );

    // Get page size from pagination.
    const size = this.keyPathVal(scope.contexts[0], "pagination.size", 0);

    return Promise.resolve(this.render(pageNumber, size));
  }

  nunjucksRender(self, context) {
    // Get page number from pagination.
    const pageNumber = self.keyPathVal(context.ctx, "pagination.pageNumber", 0);

    // Get page size from pagination.
    const size = self.keyPathVal(context.ctx, "pagination.size", 0);

    return self.render(pageNumber, size);
  }
}

module.exports = MetaRobots;
