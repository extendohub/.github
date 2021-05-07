async ({ options, context }) => {
  const content = await context.render.getContent({}, 'json')
  const data = typeof (content) === 'string' ? { url: content } : { values: content }
  const unique = context.render.hash.slice(-5)
  const encoding = {
    x: { field: options.xColumn, type: 'temporal'},
    y: { field: options.yColumns, type: 'quantitative'}
  }
  const script = `
    const vlSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: '${options.title}',
      data: ${JSON.stringify(data, null, 2)},
      mark: 'line',
      encoding: ${JSON.stringify(encoding, null, 2)}
    };
    vegaEmbed('#vis${unique}', vlSpec);
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
    <div id="vis${unique}"></div>
    <script type="text/javascript">
      ${script}
    </script>
  </body>
</html>
`
  return { html }
}
