const BaseEngine = require("./BaseEngine");
const SEO = require("../Tags/SEO");
const PageTitle = require("../Tags/PageTitle");
const PageDescription = require("../Tags/PageDescription");
const Canonical = require("../Tags/Canonical");
const MetaAuthor = require("../Tags/MetaAuthor");
const MetaRobots = require("../Tags/MetaRobots");
const OpenGraph = require("../Tags/OpenGraph");
const TwitterCard = require("../Tags/TwitterCard");

class Liquid extends BaseEngine {
  seo(eleventyConfig) {
    eleventyConfig.addLiquidTag("seo", liquidEngine => {
      const seo = new SEO(this.config, liquidEngine);
      return seo.getLiquidTag();
    });
  }

  pageTitle(eleventyConfig) {
    eleventyConfig.addLiquidTag("pageTitle", liquidEngine => {
      const pageTitle = new PageTitle(this.config, liquidEngine);
      return pageTitle.getLiquidTag();
    });
  }

  pageDescription(eleventyConfig) {
    eleventyConfig.addLiquidTag("pageDescription", liquidEngine => {
      const pageDescription = new PageDescription(this.config, liquidEngine);
      return pageDescription.getLiquidTag();
    });
  }

  canonical(eleventyConfig) {
    eleventyConfig.addLiquidTag("canonicalURL", liquidEngine => {
      const canonical = new Canonical(this.config, liquidEngine);
      return canonical.getLiquidTag();
    });
  }

  metaAuthor(eleventyConfig) {
    eleventyConfig.addLiquidTag("metaAuthor", liquidEngine => {
      const metaAuthor = new MetaAuthor(this.config, liquidEngine);
      return metaAuthor.getLiquidTag();
    });
  }

  metaRobots(eleventyConfig) {
    eleventyConfig.addLiquidTag("metaRobots", liquidEngine => {
      const metaRobots = new MetaRobots(this.config, liquidEngine);
      return metaRobots.getLiquidTag();
    });
  }

  openGraph(eleventyConfig) {
    eleventyConfig.addLiquidTag("openGraph", liquidEngine => {
      const openGraph = new OpenGraph(this.config, liquidEngine);
      return openGraph.getLiquidTag();
    });
  }

  twitterCard(eleventyConfig) {
    eleventyConfig.addLiquidTag("twitterCard", liquidEngine => {
      const twitterCard = new TwitterCard(this.config, liquidEngine);
      return twitterCard.getLiquidTag();
    });
  }
}

module.exports = Liquid;
