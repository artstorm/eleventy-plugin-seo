class BaseEngine {
  constructor(eleventyConfig) {
    this.eleventyConfig = eleventyConfig;

    this.seo(eleventyConfig);
    this.pageTitle(eleventyConfig);
    this.pageDescription(eleventyConfig);
  }
}

module.exports = BaseEngine;
