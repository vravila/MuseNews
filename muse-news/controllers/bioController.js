const LastFM = require('last-fm')
const lastfm = new LastFM('10b860590d5168c53783ae9728a9b395', { userAgent: 'MyApp/1.0.0 (http://example.com)' })

//gets artist info frm lastfm
module.exports = function(app) {
  lastfm.artistInfo({ name: 'Post Malone' }, (err, data) => {
    if (err) console.error(err)
    else console.log(data)
  })
}
