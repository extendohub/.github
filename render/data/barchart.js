async ({ context, options }) => {
  const content = await context.render.getContent({}, 'json')
  const script = `
    const vlSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: '${options.description || 'Bar chart'}',
      data: ${JSON.stringify(data, null, 2)},
      mark: 'bar',
      encoding: ${JSON.stringify(options.encoding, null, 2)}
    };
    vegaEmbed('#vis', vlSpec);
  `
  const scripts = [
    { url: 'https://cdn.jsdelivr.net/npm/vega@5.19.1' },
    { url: 'https://cdn.jsdelivr.net/npm/vega-lite@5.0.0' },
    { url: 'https://cdn.jsdelivr.net/npm/vega-embed@6.15.1' },
    script
  ]
  html = `<div id="vis"></div>`
  return { html, scripts }
}
