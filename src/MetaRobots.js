const BaseTag = require("./BaseTag");

class MetaRobots extends BaseTag {
  getObject() {
    return {
      render: (scope, hash) => {
        const pagination = scope.contexts[0].pagination;
        let robots = "index,follow";

        if (pagination && pagination.pageNumber > 0) {
          robots = `no${robots}`;
        }

        return Promise.resolve(robots);
      }
    };
  }
}

module.exports = MetaRobots;
