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
    vegaEmbed('#vis', vlSpec);
  `
  const html = `
<html>
  <head>
    <title>Embedding Vega-Lite</title>
    <script src="https://cdn.jsdelivr.net/npm/vega@5.20.2"></script>
    <script src="https://cdn.jsdelivr.net/npm/vega-lite@5.1.0"></script>
    <script src="https://cdn.jsdelivr.net/npm/vega-embed@6.17.0"></script>
  </head>
  <body>
    <div id="vis"></div>
    ${script}
  </body>
</html>
`
  return { html }
}
