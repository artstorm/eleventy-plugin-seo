class BaseEngine {
  constructor(eleventyConfig) {
    this.eleventyConfig = eleventyConfig;

    this.seo(eleventyConfig);
  }
}

module.exports = BaseEngine;
