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

  get title() {
    return this.config.title;
  }

  get description() {
    return this.config.description;
  }

  get baseURL() {
    return this.config.url;
  }
}

module.exports = BaseTag;
