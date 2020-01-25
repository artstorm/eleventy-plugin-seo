const BaseEngine = require("./BaseEngine");
const SEO = require("../Tags/SEO");
const PageDescription = require("../Tags/PageDescription");
const PageTitle = require("../Tags/PageTitle");

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
}

module.exports = Nunjucks;
