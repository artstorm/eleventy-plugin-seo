module.exports = function(eleventyConfig) {

  eleventyConfig.addLiquidTag("canonicalURL", function(liquidEngine) {
    return {
      parse: function(tagToken, remainingTokens) {
        this.url = tagToken.args;
      },
      render: function(scope, hash) {
        const site = scope.contexts[0].site;

        // Resolve parsed variable.
        var url = null;
        if (this.url !== "") {
          url = liquidEngine.evalValue(this.url, scope) || this.url;
        }

        // Use page data for url if no variable was parsed.
        url = url || scope.contexts[0].page.url;

        return Promise.resolve(site.url + url);
      }
    };
  });

};