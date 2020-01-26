const BaseTag = require("./BaseTag");

class Canonical extends BaseTag {
  render(url) {
    return this.baseURL + url;
  }

  liquidParse(tagToken, remainToken) {
    // Store possible URL that might has been passed as argument.
    this.canonicalURLArg = tagToken.args;
  }

  liquidRender(scope, hash) {
    // Resolve possible URL passed as argument to override the current page URL.
    let url = null;
    if (this.canonicalURLArg !== "") {
      url =
        this.engine.evalValue(this.canonicalURLArg, scope) ||
        this.canonicalURLArg;
    }

    // Use page data for URL if none was passed with argument.
    url = url || scope.contexts[0].page.url;

    return Promise.resolve(this.render(url));
  }

  nunjucksRender(self, context, args) {
    // Resolve possible URL passed as argument to override the current page URL.
    let url = context.env.renderString(args, context) || args;

    // Use page data for URL if none was passed with argument.
    url = url || context.ctx.page.url;

    return self.render(url);
  }
}

module.exports = Canonical;
