const Config = require("./src/Config");
const Liquid = require("./src/Engines/Liquid");
const Nunjucks = require("./src/Engines/Nunjucks");
const Canonical = require("./src/Canonical");
const MetaRobots = require("./src/MetaRobots");
const MetaAuthor = require("./src/MetaAuthor");
const OpenGraph = require("./src/OpenGraph");
const TwitterCard = require("./src/TwitterCard");

module.exports = {
  configFunction: (eleventyConfig, options = {}) => {
    const config = new Config(options);

    const liquid = new Liquid(config, eleventyConfig);
    const nunjucks = new Nunjucks(config, eleventyConfig);

    eleventyConfig.addLiquidTag("canonicalURL", liquidEngine => {
      const canonical = new Canonical(liquidEngine, config);
      return canonical.getObject();
    });

    eleventyConfig.addLiquidTag("metaAuthor", liquidEngine => {
      const metaAuthor = new MetaAuthor(liquidEngine, config);
      return metaAuthor.getObject();
    });

    eleventyConfig.addLiquidTag("metaRobots", liquidEngine => {
      const metaRobots = new MetaRobots(liquidEngine, config);
      return metaRobots.getObject();
    });

    eleventyConfig.addLiquidTag("openGraph", liquidEngine => {
      const openGraph = new OpenGraph(liquidEngine, config);
      return openGraph.getObject();
    });

    eleventyConfig.addLiquidTag("twitterCard", liquidEngine => {
      const twitterCard = new TwitterCard(liquidEngine, config);
      return twitterCard.getObject();
    });
  }
};
