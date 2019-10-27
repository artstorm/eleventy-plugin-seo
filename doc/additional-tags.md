# Additional Tags

The following liquid tags are supplied by the plugin.

## `pageTitle`

Generates the title for a page. 

```liquid
{% pageTitle %}
```

## `pageDescription`

Generates the description for a page.

```liquid
{% pageDescription %}
```

## `canonicalURL [url]`

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

## `metaAuthor`

Outputs the full name of the author for the current page.

```liquid
{% metaAuthor %}
```

## `metaRobots`

Adds robots meta directive with `index,follow` except on paginated pages which gets `noindex,follow`.

```liquid
{% metaRobots %}
```
