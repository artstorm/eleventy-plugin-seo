const BaseTag = require("./BaseTag");

class MetaRobots extends BaseTag {
  getObject() {
    return {
      render: (scope, hash) => {
        let robots = "index,follow";

        const pageNumber = this.keyPathVal(
          scope.contexts[0],
          "pagination.pageNumber",
          0
        );
        if (pageNumber > 0) {
          robots = `no${robots}`;
        }

        return Promise.resolve(robots);
      }
    };
  }
}

module.exports = MetaRobots;
