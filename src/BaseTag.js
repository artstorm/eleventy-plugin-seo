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

  get baseURL() {
    return this.config.url;
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
