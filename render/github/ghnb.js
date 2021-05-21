async ({ options, context }) => {
  function splitMarkdown(content) {
    const matches = content.match(/^---\n(.*)---/sm)
    if (matches && matches.length === 2)
      return { frontmatter: matches[1], markdown: content.slice(matches[0].length + matches.index) }
    return { frontmatter: undefined, markdown: content }
  }
  
  const content = await context.render.getContent({})
  const { frontmatter, markdown } = splitMarkdown(content)
  const encoded = new Buffer(markdown).toString('base64');
  const stringModule = `data:text/javascript;base64,${btoa(encoded)}`
  const script = `
      <script type="module">
        (async () => {
          import { Runtime, Inspector } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
          const { define } = await import(${stringModule})
          const runtime = new Runtime()
          const main = runtime.module(define, Inspector.into(document.body))
        })()
      </script>`
  const html = `<html>
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@3/dist/inspector.css">
  <body>
    ${script}
  </body>
</html>
`
  return { html }
}
