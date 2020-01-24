const fs = require("fs");
const BaseEngine = require("./BaseEngine");
const PageDescription = require("../Tags/PageDescription");

class Nunjucks extends BaseEngine {
  seo(eleventyConfig) {
    eleventyConfig.addNunjucksTag("seo", nunjucksEngine => {
      return new (function() {
        this.tags = ["seo"];

        this.parse = function(parser, nodes, lexer) {
          var tok = parser.nextToken();

          var args = parser.parseSignature(null, true);
          parser.advanceAfterBlockEnd(tok.value);

          return new nodes.CallExtensionAsync(this, "run", args);
        };

        this.run = function(context, myStringArg, callback) {
          const template = fs.readFileSync(
            `${__dirname}/../template/seo.njk`,
            "utf-8"
          );

          let ret = new nunjucksEngine.runtime.SafeString(
            context.env.renderString(template, context.ctx)
          );
          callback(null, ret);
        };
      })();
    });
  }
}

module.exports = Nunjucks;
