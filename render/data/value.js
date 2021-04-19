async ({ context }) => {
  const content = await context.render.getContent()
  return { html: `<code>${content}</code>` }
}