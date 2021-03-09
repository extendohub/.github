
({ content, options, context }) => {
  const rawURL = `${content}?raw=true`
  const html = `
    <div className="egh-center-justified cssClass" >
      <div className="egh-tm-10" >
        <video id="rendered" className="video-js vjs-big-play-centered" >
          <source src=${rawURL} type="video/mp4" />
        </video>
      </div >
    </div >`
  const css = { url: 'https://vjs.zencdn.net/7.10.2/video-js.css' }
  const script = { url: 'https://vjs.zencdn.net/7.10.2/video.min.js' }

  return { html, css, script }
}
