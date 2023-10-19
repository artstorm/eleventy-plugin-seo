const BaseTag = require("./BaseTag");

class MetaAuthor extends BaseTag {
  render(author) {
    // Use provided author or fall back on site author.
    author = author || this.siteAuthor;

    return author;
  }

  liquidRender(scope, hash) {
    const context =
      typeof scope.contexts === "undefined"
        ? scope.environments
        : scope.contexts[0];
    // Get author from front matter.
    const author = context.author;

    return Promise.resolve(this.render(author));
  }

  nunjucksRender(self, context) {
    // Get author from front matter.
    const author = context.ctx.author;

    return self.render(author);
  }
}

module.exports = MetaAuthor;
