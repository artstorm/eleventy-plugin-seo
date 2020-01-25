const htmlEntities = require("html-entities").Html5Entities;

class BaseTag {
  constructor(config, engine) {
    this._config = config;
    this.engine = engine;

    this.entities = new htmlEntities();
  }

  get config() {
    return this._config.get();
  }

  get options() {
    return this.config.options;
  }

  get siteTitle() {
    return this.config.title;
  }

  get siteDescription() {
    return this.config.description;
  }

  get siteAuthor() {
    return this.config.author;
  }

  get baseURL() {
    return this.config.url;
  }

  image(scope) {
    // Fallback on using image in config if available and none is set in front matter.
    if (!scope.contexts[0].image && this.config.image) {
      scope.contexts[0].image = this.config.image;
    }

    return scope;
  }

  getLiquidTag() {
    return {
      parse: (tagToken, remainToken) => this.liquidParse(tagToken, remainToken),
      render: (scope, hash) => this.liquidRender(scope, hash)
    };
  }

  liquidParse(tagToken, remainToken) {
    // To be implemented by subclass to handle liquid tag parsing.
  }

  liquidRender(scope, hash) {
    // To be implemented by subclass to handle liquid tag rendering.
  }

  getNunjucksTag(tag) {
    const self = this;
    const parse = this.nunjucksParse;
    const render = this.nunjucksRender;
    const nunjucksEngine = this.engine;

    return new (function() {
      this.tags = [tag];
      this.parse = parse;
      this.run = (context, myStringArg, callback) => {
        callback(
          null,
          new nunjucksEngine.runtime.SafeString(render(self, context))
        );
      };
    })();
  }

  nunjucksParse(parser, nodes, lexer) {
    var tok = parser.nextToken();

    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    return new nodes.CallExtensionAsync(this, "run", args);
  }

  nunjucksRender(self, context) {
    // To be implemented by subclass to handle nunjucks tag rendering.
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

module.exports = BaseTag;
