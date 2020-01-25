class BaseEngine {
  constructor(config, eleventyConfig) {
    this.config = config;
    this.eleventyConfig = eleventyConfig;

    this.seo(eleventyConfig);
    this.pageTitle(eleventyConfig);
    this.pageDescription(eleventyConfig);
  }
}

module.exports = BaseEngine;
