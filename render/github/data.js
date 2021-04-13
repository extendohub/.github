async ({ content, inputs, context }) => {
  const result = await context.data.query(content, inputs)
  const html = `<code>${result[0]}</code>`
  return { html }
}