const Config = require("./src/Config");
const Liquid = require("./src/Engines/Liquid");
const Nunjucks = require("./src/Engines/Nunjucks");

module.exports = {
  configFunction: (eleventyConfig, options = {}) => {
    const config = new Config(options);

    const liquid = new Liquid(config, eleventyConfig);
    const nunjucks = new Nunjucks(config, eleventyConfig);
  }
};
