async ({ content, inputs, context }) => {
  const { data, target } = context
  const result = await data.query(content, target.resource, inputs)
  if (result.data.type === 'value')
    return { html: `<code>${result.data.value}</code>` }
  if (result.data.type === 'table' && result.data.value.length > 0) {
    const table = result.data.value
    const header = `<table>`    
    const headings = ` <tr>\n    <th>${Object.keys(table[0]).join(`</th>\n    <th>`)}</th>\n  </tr>`
    const rows = table.map(row => 
     ` <tr>\n    <td>${Object.values(row).join(`</td>\n    <td>`)}</td>\n  </tr>`
    )
    const footer = '</table>'
    const html = `${header}/n${headings}/n${rows}/n${footer}/n`
    return { html }
  }
  return null
} 