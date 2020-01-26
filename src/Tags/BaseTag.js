const fs = require("fs");
const htmlEntities = require("html-entities").Html5Entities;

class BaseTag {
  constructor(config, engine) {
    this._config = config;
    this.engine = engine;

    this.id = Math.random();

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
      this.run = (context, args, callback) => {
        callback(
          null,
          new nunjucksEngine.runtime.SafeString(render(self, context, args))
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

  nunjucksRender(self, context, args) {
    // To be implemented by subclass to handle nunjucks tag rendering.
  }

  loadTemplate(template) {
    return fs.readFileSync(`${__dirname}/../templates/${template}`, "utf-8");
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
