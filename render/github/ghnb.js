async ({ options, context }) => {
  function splitMarkdown(content) {
    const matches = content.match(/^---\n(.*)---/sm)
    if (matches && matches.length === 2)
      return { frontmatter: matches[1], markdown: content.slice(matches[0].length + matches.index) }
    return { frontmatter: undefined, markdown: content }
  }

  const content = await context.render.getContent({})
  const { frontmatter, markdown } = splitMarkdown(content)
  const encoded = Buffer.from(markdown).toString('base64');
  const stringModule = `data:text/javascript;base64,${encoded}`
  const script = `
    <script type="module">
      console.log('in the code')
      import * as observables from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
      const { Runtime, Inspector } = observables
      console.log('in the code 2')
      import('${stringModule}').then(notebook => {
        console.log('in the code 4')
        const runtime = new Runtime()
        console.log('in the code 4.1')
        const main = runtime.module(notebook.define, Inspector.into(document.body))
        console.log('in the code 4.2')
      })
      console.log('in the code 5')
    </script>`
  const html = `<html>
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@3/dist/inspector.css">
  <body>
    ${script.trim()}
  </body>
</html>
`
  return { html }
}
