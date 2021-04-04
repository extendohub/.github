() => {
  const script = `
  async function _load() {
    // const url = 'https://github.com/app-extensions/test/blob/main/test.xlsx?raw=true'
    // const url ='file:///C:/git/extensions/extendo-render/xlsx/test.xlsx'
    const url = location.href + '?raw=true'
    const response = await fetch(url, { mode:"cors"})
    if (!response.ok) return
    const content = await response.arrayBuffer()
    const workbook = XLSX.read(new Uint8Array(content), { type: "array" })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    return XLSX.utils.sheet_to_json(sheet)
  }

  const run = async () => {
    debugger
    const json = await _load()
    const mountPoint = document.getElementById('xlsx-render')
    const cdg = canvasDatagrid({
      parentNode: mountPoint
    })
    cdg.style.height = '100%'
    cdg.style.width = '100%'

    const _resize = () => {
      mountPoint.style.height = (window.innerHeight - 200) + "px"
      mountPoint.style.width = (window.innerWidth - 200) + "px"
    }
    
    window.addEventListener('resize', _resize)

    mountPoint.style.display = "block"
    _resize()

    /* set up table headers */
    var L = 0
    json.forEach(function (r) { if (L < r.length) L = r.length })
    for (var i = json[0].length; i < L; ++i) {
      json[0][i] = ""
    }

    cdg.data = json
  }
  run()
`
const html = '<div id="xlsx-render"></div>'
const scripts = [
    { url: 'https://unpkg.com/xlsx/dist/xlsx.full.min.js' },
    { url: 'https://unpkg.com/canvas-datagrid/dist/canvas-datagrid.js' },
    script
  ]

  return { html, scripts }
}
