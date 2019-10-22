const Config = require("./src/Config");
const SEO = require("./src/SEO");
const Canonical = require("./src/Canonical");
const MetaRobots = require("./src/MetaRobots");

module.exports = {
  configFunction: (eleventyConfig, options = {}) => {
    const config = new Config(options);

    eleventyConfig.addLiquidTag("seo", liquidEngine => {
      const seo = new SEO(liquidEngine, config);
      return seo.getObject();
    });

    eleventyConfig.addLiquidTag("canonicalURL", liquidEngine => {
      const canonical = new Canonical(liquidEngine, config);
      return canonical.getObject();
    });

    eleventyConfig.addLiquidTag("metaRobots", liquidEngine => {
      const metaRobots = new MetaRobots(liquidEngine, config);
      return metaRobots.getObject();
    });
  }
};
