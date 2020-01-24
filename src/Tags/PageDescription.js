class PageDescription {
  constructor(excerpt) {
    this.excerpt = excerpt;
  }

  result() {
    // Fallback on `description` in config if no excerpt is set for the page.
    const pageDescription = this.excerpt || this.siteDescription;

    return pageDescription;
  }
}

module.exports = PageDescription;
