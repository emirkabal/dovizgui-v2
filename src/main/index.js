const express = require('express')
    , app = express()
    , http = require('http')
    , path = require('path')
    , logger = require('../base/KabalLogger');
//
setInterval(() => {
    http.get('http://doviz.emirkabal.com');
}, 4 * 60 * 1000);
app.use(express.static(path.join(__dirname, '../public')));
//


app.get('/', async (req, res) => {
    res.status(200).sendFile('src/views/index.html', { root: '.' });
});

app.use('*', (req, res) => {
    res.status(200).sendFile('src/views/404.html', { root: '.' });
}); //404 redirect

app.listen(3000, () => {
    logger.log("web 3000 portu üzerinde yayınlanıyor.", "ready");
});