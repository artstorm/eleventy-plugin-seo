const htmlEntities = require("html-entities").Html5Entities;

class BaseTag {
  constructor(liquidEngine, config) {
    this.liquidEngine = liquidEngine;
    this._config = config;

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

  getObject() {
    return {
      parse: (tagToken, remainToken) => this.parse(tagToken, remainToken),
      render: (scope, hash) => this.render(scope, hash)
    };
  }

  parse(tagToken, remainToken) {
    // To be implemented by subclass to handle liquid tag parsing.
  }

  render(scope, hash) {
    // To be implemented by subclass to handle liquid tag rendering.
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
