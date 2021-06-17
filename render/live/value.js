export default ({ content, context }) => {
  const root = document.createElement('span')
  root.innerText = content.toString()
  if (context.options.color) root.style.color = context.options.color
  return root
}
