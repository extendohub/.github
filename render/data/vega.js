async ({ content, options }) => {
  const data = typeof (content) === 'string' ? { url: content } : { values: content }
  const script = `
    const vlSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: '${options.description || 'Bar chart'}',
      data: ${JSON.stringify(data, null, 2)},
      mark: '${options.mark}',
      encoding: ${JSON.stringify(options.encoding, null, 2)}
    };
    debugger
    vegaEmbed('#vis', vlSpec);
  `
  const scripts = [
    { url: 'https://cdn.jsdelivr.net/npm/vega@5.20.2' },
    { url: 'https://cdn.jsdelivr.net/npm/vega-lite@5.1.0' },
    { url: 'https://cdn.jsdelivr.net/npm/vega-embed@6.17.0' }
  ]
  html = `<div id="vis"></div>`
  return { html, scripts, bodyScripts: [script] }
}
