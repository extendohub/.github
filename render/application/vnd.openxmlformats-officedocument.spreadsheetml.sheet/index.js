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
    return XLSX.utils.to_json(workbook)[workbook.SheetNames[0]]
  }

  function _resize() {
    _grid.style.height = (window.innerHeight - 200) + "px";
    _grid.style.width = (window.innerWidth - 200) + "px";
  }

  const run = async () => {
    const json = await _load()
    const cdg = canvasDatagrid({
      parentNode: _grid
    })
    cdg.style.height = '100%'
    cdg.style.width = '100%'

    window.addEventListener('resize', _resize);

    const mountPoint = document.getElementById('xlsx-render')
    mountPoint.style.display = "block"
    _resize()

    /* set up table headers */
    var L = 0
    json.forEach(function (r) { if (L < r.length) L = r.length; })
    for (var i = json[0].length; i < L; ++i) {
      json[0][i] = ""
    }

    cdg.data = json
  }
  run()
`
  const html = `
    <div id="xlsx-render"
    </div >`
  const scripts = [
    { url: 'https://unpkg.com/xlsx/dist/xlsx.full.min.js' },
    { url: 'https://unpkg.com/canvas-datagrid/dist/canvas-datagrid.js' },
    script
  ]

  return { html, scripts }
}
