const BaseTag = require("./BaseTag");

class Canonical extends BaseTag {
  parse(tagToken, remainToken) {
    // Store possible URL that might has been passed as argument.
    this.url = tagToken.args;
  }

  render(scope, hash) {
    // Resolve possible URL passed as argument.
    var url = null;
    if (this.url !== "") {
      url = this.liquidEngine.evalValue(this.url, scope) || this.url;
    }

    // Use page data for URL if none was passed with argument.
    url = url || scope.contexts[0].page.url;

    return Promise.resolve(this.baseURL + url);
  }
}

module.exports = Canonical;
