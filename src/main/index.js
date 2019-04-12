const express = require('express')
    , app = express()
    , tcmb = require('tcmb-doviz')
    , Doviz = new tcmb()
    , path = require('path')
    , logger = require('../base/KabalLogger');
//
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
//

app.get('/', async (req, res) => {

    let doviz = await Doviz.DovizListesi().catch(() => res.status('500').send(JSON.stringify({hata:"Beklenmedik bir hata oluştu."})));
    doviz.kurlar.sort(list);
    logger.debug(getIP(req));
    res.status(200).render('index', { data: doviz });


});

app.get('/list', async (req, res) => {

    let doviz = await Doviz.DovizListesi().catch(() => res.status('500').send(JSON.stringify({ hata: "Beklenmedik bir hata oluştu." })));;
    doviz.kurlar.sort(list);
    logger.debug(getIP(req));
    res.status(200).send(JSON.stringify(doviz, null , 3));

});

app.use('*', (req, res) => res.redirect('/')); //404 redirect

app.listen(3000, () => {
    logger.log("web 3000 portu üzerinde yayınlanıyor.", "ready");
});


function list(a, b) {
    if (a.satis > b.satis)
        return -1;
    if (a.satis < b.satis)
        return 1;
    return 0;
}

function getIP(req) {
    var forwardedIpsStr = req.header('x-forwarded-for');
    var IP = 'localhost';

    if (forwardedIpsStr) {
        IP = forwardedIps = forwardedIpsStr.split(',')[0];
    }
    return IP;
}