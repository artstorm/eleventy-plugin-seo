const BaseEngine = require("./BaseEngine");
const SEO = require("../Tags/SEO");
const PageTitle = require("../Tags/PageTitle");
const PageDescription = require("../Tags/PageDescription");
const Canonical = require("../Tags/Canonical");
const MetaAuthor = require("../Tags/MetaAuthor");
const MetaRobots = require("../Tags/MetaRobots");
const OpenGraph = require("../Tags/OpenGraph");
const TwitterCard = require("../Tags/TwitterCard");

class Nunjucks extends BaseEngine {
  seo(eleventyConfig) {
    eleventyConfig.addNunjucksTag("seo", nunjucksEngine => {
      const seo = new SEO(this.config, nunjucksEngine);
      return seo.getNunjucksTag("seo");
    });
  }

  pageTitle(eleventyConfig) {
    eleventyConfig.addNunjucksTag("pageTitle", nunjucksEngine => {
      const pageTitle = new PageTitle(this.config, nunjucksEngine);
      return pageTitle.getNunjucksTag("pageTitle");
    });
  }

  pageDescription(eleventyConfig) {
    eleventyConfig.addNunjucksTag("pageDescription", nunjucksEngine => {
      const pageDescription = new PageDescription(this.config, nunjucksEngine);
      return pageDescription.getNunjucksTag("pageDescription");
    });
  }

  canonical(eleventyConfig) {
    eleventyConfig.addNunjucksTag("canonicalURL", nunjucksEngine => {
      const canonical = new Canonical(this.config, nunjucksEngine);
      return canonical.getNunjucksTag("canonicalURL");
    });
  }

  metaAuthor(eleventyConfig) {
    eleventyConfig.addNunjucksTag("metaAuthor", nunjucksEngine => {
      const metaAuthor = new MetaAuthor(this.config, nunjucksEngine);
      return metaAuthor.getNunjucksTag("metaAuthor");
    });
  }

  metaRobots(eleventyConfig) {
    eleventyConfig.addNunjucksTag("metaRobots", nunjucksEngine => {
      const metaRobots = new MetaRobots(this.config, nunjucksEngine);
      return metaRobots.getNunjucksTag("metaRobots");
    });
  }

  openGraph(eleventyConfig) {
    eleventyConfig.addNunjucksTag("openGraph", nunjucksEngine => {
      const openGraph = new OpenGraph(this.config, nunjucksEngine);
      return openGraph.getNunjucksTag("openGraph");
    });
  }

  twitterCard(eleventyConfig) {
    eleventyConfig.addNunjucksTag("twitterCard", nunjucksEngine => {
      const twitterCard = new TwitterCard(this.config, nunjucksEngine);
      return twitterCard.getNunjucksTag("twitterCard");
    });
  }
}

module.exports = Nunjucks;
