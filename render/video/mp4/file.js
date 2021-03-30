
({ content, inputs, context }) => {
  const { _ } = context
  const { controls, autoplay } = inputs
  const setup = { controls: _.defaultTo(controls, true), autoplay: _.defaultTo(autoplay, false) }
  const title = content.split('/').slice(-1)[0]
  const html = `
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="https://vjs.zencdn.net/7.10.2/video-js.css" />
    <script type="application/javascript" src="https://vjs.zencdn.net/7.10.2/video.min.js" />
  </head>
  <body>
    <div class="egh-center-justified" >
      <div class="egh-tm-10" >
        <video id="rendered" class="video-js vjs-big-play-centered" preload="auto" data-setup='${JSON.stringify(setup)}' >
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
