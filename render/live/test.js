export default ({ content }) => {
  const root = document.createElement('span')
  root.innerText = content.toString
  return root
}
