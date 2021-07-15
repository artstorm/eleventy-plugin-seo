# About Eleventy Plugin SEO

An [Eleventy](https://github.com/11ty/eleventy) plugin to generate meta tags for improved SEO using the Liquid or Nujucks templating engines.

[![GitHub Actions](https://github.com/artstorm/eleventy-plugin-seo/workflows/CI/badge.svg)](https://github.com/artstorm/eleventy-plugin-seo/actions)
[![GitHub Actions](https://github.com/artstorm/eleventy-plugin-seo/workflows/style/badge.svg)](https://github.com/artstorm/eleventy-plugin-seo/actions)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1ed1dcde669edcc8240a/test_coverage)](https://codeclimate.com/github/artstorm/eleventy-plugin-seo/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/1ed1dcde669edcc8240a/maintainability)](https://codeclimate.com/github/artstorm/eleventy-plugin-seo/maintainability)

_I wrote this plugin when moving from Jekyll to Eleventy to get the functionality I previously had with Jekyll SEO Tag._

## Features

* Page title with styling options and pagination.
* Page description.
* Canonical URL.
* Robots meta directive for pagination.
* Author meta directive.
* Open Graph markup.
* Twitter Card markup.
* Supports Liquid and Nunjucks.

## Installation

Available on [npm](https://www.npmjs.com/package/eleventy-plugin-seo):

```sh
npm install eleventy-plugin-seo --save
```

Add the plugin to `.eleventy.js`:

```js
const pluginSEO = require("eleventy-plugin-seo");

module.exports =  function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSEO, require("./src/_data/seo.json"));
};
```

## Contributions and Support

This plugins does not come with GitHub Issues-based support, and users are instead encouraged to become active participants in its continued development - by fixing any bugs that they encounter, or by improving the plugin wherever it's found to be lacking.

If you wish to make a change, [open a Pull Request](https://github.com/artstorm/eleventy-plugin-seo/pull/new) - even if it just contains a draft of the changes you're planning, or a test that reproduces an issue - and we can discuss it further from there.

## Usage

Add the following right before `</head>` in your site's template(s):

Liquid:
```
{% seo %}
```

Nunjucks:
```
{% seo "" %}
```

Done!

### Front Matter

The plugin uses these front matters when available:

```yml
---
title: Some page title
excerpt: Some page excerpt
author: Jane Doe
image: foo.jpg
ogtype: website
showPageNumbers: false
---
```

* `ogtype` defaults to `article`, set it to `website` or something more appropriate via front matter where required.
* `showPageNumbers` is `true` by default, but may be turned off globally via [plugin configuration](#Config) or on a per-page basis via a page’s front matter.

## Config

Pass in an object with config options to the plugin:

```js
eleventyConfig.addPlugin(pluginSEO, {
  title: "Foobar Site",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  url: "https://foo.com",
  author: "Jane Doe",
  twitter: "username",
  image: "foo.jpg"
});
```  

Alternatively keep the options in an external file and require it:

```js
eleventyConfig.addPlugin(pluginSEO, require("./src/_data/seo.json"));
```

### title

Uses the title in front matter and by default the site title gets appended to the page title, `page title - site title`. Page with page number gets appended to the page title when paginated. 

See options for customization.

### description

Uses front matter excerpt to generate the description. If no excerpt is set for a page it falls back on using the site description in the config. 

### url

Full URL to the site without trailing slash, `https://foo.com`.

### author

Full name of the site author, `Jane Doe`. Can be overridden on a per page basis using `author` in front matter.

### twitter

Twitter username for the author of the site. Used when generating the markup for Twitter cards.

### image

URL to default image to use if none is set in front matter when creating markup blocks for open graph and Twitter cards.

### Options

The behavior of the output can be controlled via an options object that can be passed in with the config.

```js
eleventyConfig.addPlugin(pluginSEO, {
  title: "Foobar Site",
  ...
  options: {
    titleStyle: "minimalistic",
    titleDivider: "|",
    imageWithBaseUrl: true,
    twitterCardType: "summary_large_image",
    showPageNumbers: false
  }
});
```  

#### titleStyle

Setting the style to `minimalistic` removes the appending of the site title to all title strings.

#### titleDivider

Changes the divider between elements in the title output from `-` to any custom character or string.

#### imageWithBaseUrl

Prepends the config `url` to the `image` option.

#### twitterCardType

Card type for Twitter card. Default is `summary`.

#### showPageNumbers

Enables you to control whether page numbers are displayed in the title, globally. Default is `true`.

## Additional Tags

While adding the `seo` tag is all that is needed, the plugin defines more tags that it uses internally that can be convenient to use in other places.

* [Additional Tags](doc/additional-tags.md)
