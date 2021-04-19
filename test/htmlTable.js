const fs = require('fs')

const test = async () => {
  const params = {
    context: {
      render: {
        getContent: () => 'One, Two, Three, Four\n1,2,3,4\n4,3,2,1'
      }
    },
    options: { headings: true }
  }
  const source = fs.readFileSync('./render/data/htmlTable.js')
  const code = new Function('params', `return (${source})(params)`)
  const rendered = await code(params)
  console.log(rendered)
}
test()