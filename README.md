# About Eleventy Plugin SEO

An [Eleventy](https://github.com/11ty/eleventy) plugin to generate meta tags for improved SEO using the Liquid templating engine.

[![GitHub Actions](https://github.com/artstorm/eleventy-plugin-seo/workflows/CI/badge.svg)](https://github.com/artstorm/eleventy-plugin-seo/actions)
[![codecov](https://codecov.io/gh/artstorm/eleventy-plugin-seo/branch/master/graph/badge.svg)](https://codecov.io/gh/artstorm/eleventy-plugin-seo)
[![Maintainability](https://api.codeclimate.com/v1/badges/1ed1dcde669edcc8240a/maintainability)](https://codeclimate.com/github/artstorm/eleventy-plugin-seo/maintainability)
[![GitHub Actions](https://github.com/artstorm/eleventy-plugin-seo/workflows/style/badge.svg)](https://github.com/artstorm/eleventy-plugin-seo/actions)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

_I wrote this plugin when moving from Jekyll to Eleventy to get the functionality I previously had with Jekyll SEO Tag._

## Features

* Page title with styling options and pagination.
* Page description.
* Canonical URL.
* Robots meta directive for pagination.
* Author meta directive.

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

## Usage

Add the following right before `</head>` in your site's template(s):

```liquid
{% seo %}
```

Done!

### Front Matter

The plugin uses these front matters when available:

```yml
---
title:   Some page title
excerpt: Some page excerpt
author:  Jane Doe
---
```

## Config

Pass in an object with config options to the plugin:

```js
eleventyConfig.addPlugin(pluginSEO, {
  title: "Foobar Site",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  url: "https://foo.com",
  author: "Jane Doe"
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

### Options

The behavior of the output can be controlled via an options object that can be passed in with the config.

```js
eleventyConfig.addPlugin(pluginSEO, {
  title: "Foobar Site",
  ...
  options: {
    titleStyle: "minimalistic",
    titleDivider: "|"
  }
});
```  

#### titleStyle

Setting the style to `minimalistic` removes the appending of the site title to all title strings.

#### titleDivider

Changes the divider between elements in the title output from `-` to any custom character or string.

## Additional Tags

While adding the `{% seo %}` tag is all that is needed, the plugin defines more liquid tags that it uses internally that can be convenient to use in other places.

The following liquid tags are supplied by the plugin.

### `pageTitle`

Generates the title for a page. 

```liquid
{% pageTitle %}
```

### `pageDescription`

Generates the description for a page.

```liquid
{% pageDescription %}
```

### `canonicalURL [url]`

Generates the canonical URL for the current page or for another page if passing in an argument.

```liquid
{% canonicalURL %}
{% canonicalURL /feed.xml %}
{% canonicalURL post.url %}
```

Use without arg to canonical url for current page:

```liquid
<link rel="canonical" href="{% canonicalURL %}">
```

Use with arg to link to a specific page, like feed.xml:

```liquid
<link type="application/atom+xml" rel="alternate" href="{% canonicalURL /feed.xml %}" title="{{ site.title }}" >
```

Use with Eleventy provided variables, like `page.url` that resolves to an url in places like...

...feed.liquid: 

```liquid
{% for post in collections.posts limit: 10 %}
  ...
  <link>{% canonicalURL post.url %}</link>
  ...
{% endfor %}
```

...sitemap.liquid:
```liquid
{% for item in collections.all %}
  ...
  <loc>{% canonicalURL item.url %}</loc>
  ...
{% endfor %}
```

### `metaAuthor`

Outputs the full name of the author for the current page.

```liquid
{% metaAuthor %}
```

### `metaRobots`

Adds robots meta directive with `index,follow` except on paginated pages which gets `noindex,follow`.

```liquid
{% metaRobots %}
```
