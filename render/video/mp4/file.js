
({ content, options, context }) => {
  const rawURL = `${content}?raw=true`
  const html = `
    <div class="egh-center-justified cssClass" >
      <div class="egh-tm-10" >
        <video id="rendered" class="video-js vjs-big-play-centered" controls preload="auto" >
          <source src=${rawURL} type="video/mp4" />
        </video>
      </div >
    </div >`
  const css = { url: 'https://vjs.zencdn.net/7.10.2/video-js.css' }
  const script = { url: 'https://vjs.zencdn.net/7.10.2/video.min.js' }

  return { html, css, script }
}
