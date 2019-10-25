class Config {
  constructor(config = {}) {
    const defaults = {
      url: ""
    };
    config = { ...defaults, ...config };

    this.config = config;
  }

  get() {
    return this.config;
  }
}

module.exports = Config;
