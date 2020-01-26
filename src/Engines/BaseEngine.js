class BaseEngine {
  constructor(config, eleventyConfig) {
    this.config = config;
    this.eleventyConfig = eleventyConfig;

    this.seo(eleventyConfig);
    this.pageTitle(eleventyConfig);
    this.pageDescription(eleventyConfig);
    this.canonical(eleventyConfig);
    this.metaAuthor(eleventyConfig);
    this.metaRobots(eleventyConfig);

    this.openGraph(eleventyConfig);
    this.twitterCard(eleventyConfig);
  }
}

module.exports = BaseEngine;
