const BaseTag = require("./BaseTag");

class MetaAuthor extends BaseTag {
  render(scope, hash) {
    // Get excerpt from front matter or fall back on site author.
    const author = scope.contexts[0].author || this.siteAuthor;

    return Promise.resolve(author);
  }
}

module.exports = MetaAuthor;
