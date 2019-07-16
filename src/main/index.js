const express = require('express')
    , axios = require('axios').default
    , app = express()
    , path = require('path')
    , logger = require('../base/KabalLogger');
//
app.use(express.static(path.join(__dirname, '../public')));
//

app.get('/', async (req, res) => {
    res.status(200).sendFile('src/views/index.html');
});

app.get('/list', async (req, res) => {
    let data = await axios.get('https://api.canlidoviz.com/web/items?type=0').then((a) => {
        return a.data.map(v => {
            return {
                name: v.name,
                code: v.code,
                sell: Number(v.sellPrice.toFixed(2)),
                buy: Number(v.buyPrice.toFixed(2)),
                updateDate: v.lastUpdateDate
            }
        });
    }).catch(() => null);
    if(!data) return res.json({
        status: "err"
    });
    data.sort(list);
    res.status(200).send(JSON.stringify(data.filter(e => e.sell != 0), null , 3));

});

app.use('*', (req, res) => res.redirect('/')); //404 redirect

app.listen(3000, () => {
    logger.log("web 3000 portu üzerinde yayınlanıyor.", "ready");
});


function list(a, b) {
    let val = 0;
    if (a.sell > b.sell)
        val = -1;
    if (a.sell < b.sell)
        val = 1;
    if (["USD", "EUR", "GBP"].includes(b.code) || ["USD", "EUR", "GBP"].includes(a.code))
        val = -1;
    return val;
}