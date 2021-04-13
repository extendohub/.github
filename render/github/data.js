async ({ content, inputs, context }) => {
  const { data, target } = context
  const result = await data.query(content, target.resource, inputs)
  const html = `<code>${result[0]}</code>`
  return { html }
} 