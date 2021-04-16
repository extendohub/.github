async ({ content, inputs }) => {
  const data = typeof(content) === 'string'
    ? { url: content}
    : { values: JSON.stringify(content, null, 2)}
  const script = `
    const vlSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: '${inputs.description || 'Bar chart'}',
      data: ${data},
      mark: 'bar',
      encoding: ${JSON.stringify(inputs.encoding, null, 2)}
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
}