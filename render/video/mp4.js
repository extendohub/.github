export default ({ options, context }) => {
  const { _ } = context
  const { controls, autoplay } = options
  const setup = { controls: _.defaultTo(controls, true), autoplay: _.defaultTo(autoplay, false) }
  const html = `
      <div class="egh-center-justified" >
        <div class="egh-tm-10" >
          <video id="rendered" class="video-js vjs-big-play-centered" preload="auto" data-setup='${JSON.stringify(setup)}' >
            <source src=${context.target.url} type="video/mp4" />
          </video>
        </div >
      </div >`
  const styles = { url: 'https://vjs.zencdn.net/7.10.2/video-js.css' }
  const scripts = { url: 'https://vjs.zencdn.net/7.10.2/video.min.js' }
  return { html, styles, scripts }
}
