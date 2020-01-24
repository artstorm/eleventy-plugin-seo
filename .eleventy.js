const Config = require("./src/Config");
const Nunjucks = require("./src/Engines/Nunjucks");
const SEO = require("./src/SEO");
const Title = require("./src/Title");
const Description = require("./src/Description");
const Canonical = require("./src/Canonical");
const MetaRobots = require("./src/MetaRobots");
const MetaAuthor = require("./src/MetaAuthor");
const OpenGraph = require("./src/OpenGraph");
const TwitterCard = require("./src/TwitterCard");

module.exports = {
  configFunction: (eleventyConfig, options = {}) => {
    const config = new Config(options);

    const nunjucks = new Nunjucks(eleventyConfig);

    eleventyConfig.addLiquidTag("seo", liquidEngine => {
      const seo = new SEO(liquidEngine, config);
      return seo.getObject();
    });

    eleventyConfig.addLiquidTag("pageTitle", liquidEngine => {
      const title = new Title(liquidEngine, config);
      return title.getObject();
    });

    eleventyConfig.addLiquidTag("pageDescription", liquidEngine => {
      const description = new Description(liquidEngine, config);
      return description.getObject();
    });

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
