const test = require("ava");
const Config = require("../../src/Config");
const PageTitle = require("../../src/Tags/PageTitle");

test.beforeEach(t => {
  t.context.config = new Config({ title: "Site title" });
});

test("A provided title should be used", t => {
  const pageTitle = new PageTitle(t.context.config);
  let title = pageTitle.render("A title");

  t.is(title, "A title - Site title");
});

test("Missing title should use site config title", t => {
  const pageTitle = new PageTitle(t.context.config);
  let title = pageTitle.render();

  t.is(title, "Site title");
});

test("Title should be escaped", t => {
  const config = new Config({ title: "Let's escape" });
  const pageTitle = new PageTitle(config);
  let title = pageTitle.render();

  t.is(title, "Let&apos;s escape");
});

test("Page and pagenumber should be added on paginated pages", t => {
  const pageTitle = new PageTitle(t.context.config);
  let title = pageTitle.render("A title", 1, 2);

  t.is(title, "A title - Page 2 - Site title");
});

test("Page and pagenumber should not be added on paginated pages with pageNumber 0", t => {
  const pageTitle = new PageTitle(t.context.config);
  let title = pageTitle.render("A title", 0);

  t.is(title, "A title - Site title");
});

test("Page and pagenumber should not be added on paginated pages with size 1", t => {
  const pageTitle = new PageTitle(t.context.config);
  let title = pageTitle.render("A title", 1, 1);

  t.is(title, "A title - Site title");
});

test("Page and pagenumber should not be added if configured to not include them", t => {
  t.context.config.config.options.showPageNumbers = "false";
  const pageTitle = new PageTitle(t.context.config);
  let title = pageTitle.render("A title", 1, 2);

  t.is(title, "A title - Site title");
});

test("Should be able to set custom divider", t => {
  const config = new Config({
    title: "Site title",
    options: { titleDivider: "|" }
  });
  const pageTitle = new PageTitle(config);
  let title = pageTitle.render("A title", 0);

  t.is(title, "A title | Site title");
});

test("Minimalistic style should not append site title", t => {
  const config = new Config({
    title: "Site title",
    options: { titleStyle: "minimalistic" }
  });
  const pageTitle = new PageTitle(config);
  let title = pageTitle.render("A title", 0);

  t.is(title, "A title");
});

test("Liquid engine should provide front matter title", t => {
  // Mock liquid engine scope
  let scope = {
    contexts: [
      {
        title: "Front matter title"
      }
    ]
  };

  const pageTitle = new PageTitle(t.context.config);

  return pageTitle.liquidRender(scope).then(result => {
    t.is(result, "Front matter title - Site title");
  });
});

test("Liquid engine should use computed title", t => {
  // Mock liquid engine scope
  let scope = {
    contexts: [
      {
        renderData: { title: "A computed title" }
      }
    ]
  };

  const pageTitle = new PageTitle(t.context.config);

  return pageTitle.liquidRender(scope).then(result => {
    t.is(result, "A computed title - Site title");
  });
});

test("Nunjucks engine should provide front matter title", t => {
  // Mock nunjucks engine context
  let context = {
    ctx: {
      title: "Front matter title"
    }
  };

  const pageTitle = new PageTitle(t.context.config);
  let title = pageTitle.nunjucksRender(pageTitle, context);

  t.is(title, "Front matter title - Site title");
});

test("Nunjucks engine should use computed title", t => {
  // Mock nunjucks engine context
  let context = {
    ctx: {
      renderData: { title: "A computed title" }
    }
  };

  const pageTitle = new PageTitle(t.context.config);
  let title = pageTitle.nunjucksRender(pageTitle, context);

  t.is(title, "A computed title - Site title");
});
