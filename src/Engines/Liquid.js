const BaseEngine = require("./BaseEngine");
const SEO = require("../Tags/SEO");
const PageTitle = require("../Tags/PageTitle");
const PageDescription = require("../Tags/PageDescription");

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
}

module.exports = Liquid;
