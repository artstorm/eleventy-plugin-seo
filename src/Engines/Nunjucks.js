const fs = require("fs");
const BaseEngine = require("./BaseEngine");
const PageDescription = require("../Tags/PageDescription");
const PageTitle = require("../Tags/PageTitle");

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

  pageTitle(eleventyConfig) {
    eleventyConfig.addNunjucksTag("pageTitle", nunjucksEngine => {
      return new (function() {
        this.tags = ["pageTitle"];

        this.parse = function(parser, nodes, lexer) {
          var tok = parser.nextToken();

          var args = parser.parseSignature(null, true);
          parser.advanceAfterBlockEnd(tok.value);

          return new nodes.CallExtensionAsync(this, "run", args);
        };

        this.run = function(context, myStringArg, callback) {
          const pageTitle = new PageTitle(context.ctx.title);

          let ret = new nunjucksEngine.runtime.SafeString(
            pageTitle.result()
          );
          callback(null, ret);
        };
      })();
    });
  }

  pageDescription(eleventyConfig) {
    eleventyConfig.addNunjucksTag("pageDescription", nunjucksEngine => {
      return new (function() {
        this.tags = ["pageDescription"];

        this.parse = function(parser, nodes, lexer) {
          var tok = parser.nextToken();

          var args = parser.parseSignature(null, true);
          parser.advanceAfterBlockEnd(tok.value);

          return new nodes.CallExtensionAsync(this, "run", args);
        };

        this.run = function(context, myStringArg, callback) {
          const pageDescription = new PageDescription(context.ctx.excerpt);
          let ret = new nunjucksEngine.runtime.SafeString(
            pageDescription.result()
          );
          callback(null, ret);
        };
      })();
    });
  }
}

module.exports = Nunjucks;
