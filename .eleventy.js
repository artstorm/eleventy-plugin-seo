const Canonical = require("./src/Canonical");

module.exports = {
  configFunction: (eleventyConfig, options = {}) => {
    eleventyConfig.addLiquidTag("canonicalURL", liquidEngine => {
      const canonical = new Canonical(liquidEngine);
      return canonical.getObject();
    });
  }
};
