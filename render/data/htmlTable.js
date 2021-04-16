async ({ content }) => {
  const table = content
  const header = `<table>`
  const headings = ` <tr>\n    <th>${Object.keys(table[0]).join(`</th>\n    <th>`)}</th>\n  </tr>`
  const rows = table.map(row =>
    ` <tr>\n    <td>${Object.values(row).join(`</td>\n    <td>`)}</td>\n  </tr>`
  )
  const footer = '</table>'
  const html = `${header}/n${headings}/n${rows}/n${footer}/n`
  return { html }
}