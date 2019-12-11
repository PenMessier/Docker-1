function loadTemplates() {
  const templates = $('[type="text/template"]');

  const promises = templates.map((i, template) => {
    const $template = $(template);
    const src = $template.attr('src');
    if (!src) {
      return Promise.resolve();
    }

    const promise = fetch(src)
      .then((response) => response.text())
      .then((html) => {
        $template.html(html)
      });

    return promise;
  });

  return Promise.all(promises);
}