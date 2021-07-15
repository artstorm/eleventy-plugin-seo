const { merge } = require("lodash");

class Config {
  constructor(config = {}) {
    const defaults = {
      url: "",
      options: {
        twitterCardType: "summary",
        showPageNumbers: true
      }
    };
    config = merge(defaults, config);

    this.config = config;
  }

  get() {
    return this.config;
  }
}

module.exports = Config;
