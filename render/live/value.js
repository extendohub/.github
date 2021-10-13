export default ({ inputs, context }) => {
  const root = document.createElement('span')
  root.innerText = inputs.content.toString()
  if (inputs.color) root.style.color = inputs.color
  return root
}
