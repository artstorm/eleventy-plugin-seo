# About Eleventy Plugin SEO

An [Eleventy](https://github.com/11ty/eleventy) plugin to generate meta tags for improved SEO using the Liquid templating engine.

[![GitHub Actions](https://github.com/artstorm/eleventy-plugin-seo/workflows/CI/badge.svg)](https://github.com/artstorm/eleventy-plugin-seo/actions)
[![GitHub Actions](https://github.com/artstorm/eleventy-plugin-seo/workflows/style/badge.svg)](https://github.com/artstorm/eleventy-plugin-seo/actions)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Installation

Available on [npm](https://www.npmjs.com/package/eleventy-plugin-seo).

```
npm i eleventy-plugin-seo --save
```

And then add the plugin to `.eleventy.js`.

```
const pluginSEO = require("eleventy-plugin-seo");

module.exports =  function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSEO);
};
```

## Usage

### Supplies

#### canonicalURL

Uses: `site.url`

```
{% canonicalURL %}
{% canonicalURL /feed.xml %}
{% canonicalURL post.url %}
```

Use without arg to canonical url for current page
```
<link rel="canonical" href="{% canonicalURL %}">
```

Use with arg to link to a specific page, like feed.xml
```
<link type="application/atom+xml" rel="alternate" href="{% canonicalURL /feed.xml %}" title="{{ site.title }}" >
```

Use with eleventy data arg, like post.url that resolves to the current url in places like feed.liquid or sitemap.liquid
```
// from feed.liquid
<link>{% canonicalURL post.url %}</link>

// from sitemap.liquid
<loc>{% canonicalURL item.url %}</loc>
```
