const Config = require("./src/Config");
const Canonical = require("./src/Canonical");

module.exports = {
  configFunction: (eleventyConfig, options = {}) => {
    const config = new Config(options);

    eleventyConfig.addLiquidTag("canonicalURL", liquidEngine => {
      const canonical = new Canonical(liquidEngine, config);
      return canonical.getObject();
    });
  }
};
