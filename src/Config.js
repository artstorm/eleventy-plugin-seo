class Config {
  constructor(options = {}) {
    const defaults = {
      url: ""
    };
    options = { ...defaults, ...options };

    this.options = options;
  }

  get() {
    return this.options;
  }
}

module.exports = Config;
