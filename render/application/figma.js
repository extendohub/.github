async ({ content, context }) => {
  const [file, node] = content.split('#')

  const response = await new Promise(resolve => {
    https.get(`https://api.figma.com/v1/images/${file}?ids=${node}`, resolve);
  });
  let data = await new Promise((resolve, reject) => {
    let data = ''
    response.on('data', chunk => data += chunk)
    response.on('error', err => reject(err))
    response.on('end', () => resolve(data))
  })

  const images = JSON.parse(data).images
  const imageUrl = images[node]
  if (!imageUrl) return null
  const html = `<img src=${imageUrl} />`
  return { html }
}