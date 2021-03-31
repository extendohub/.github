({ content, inputs, context }) => {
  const { _ } = context
  const { controls, autoplay } = inputs
  const setup = { controls: _.defaultTo(controls, true), autoplay: _.defaultTo(autoplay, false) }
  const fileAndQuery = content.split('/').slice(-1)[0]
  const title = fileAndQuery.split('?').slice(0, 1)[0]
  const html = `
<html>
  <head>
    <title>${title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://vjs.zencdn.net/7.10.2/video-js.css"></link>
    <script type="application/javascript" src="https://vjs.zencdn.net/7.10.2/video.min.js"></script>
    <script>
      const register = function () {
          videojs("rendered", {}, function() {
            // setup a listener to tell the parent DOM that the child is "ready"
          this.on('ready', function () { 
              window.parent.postMessage('renderedReady', 'https://github.com')
          })
        })
      }
      // hook into parent lifecycle to register our child listener
      if (document.readyState === "complete" || document.readyState === "interactive") {
          setTimeout(register, 1)
      } else {
          document.addEventListener("DOMContentLoaded", register, false)
      }
    </script>
  </head>
  <body>
    <div class="egh-center-justified" >
      <div class="egh-tm-10" >
        <video id="rendered" class="video-js vjs-big-play-centered vjs-fill" preload="auto" data-setup='${JSON.stringify(setup)}' >
          <source src=${content} type="video/mp4" />
        </video>
      </div >
    </div >
  </body>
</html>`
  const styles = { url: 'https://vjs.zencdn.net/7.10.2/video-js.css' }
  const script = { url: 'https://vjs.zencdn.net/7.10.2/video.min.js' }

  return { html, styles, script }
}
