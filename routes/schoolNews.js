const fs = require('fs');
module.exports = function (app) {
    app.get("/schoolNews", (req, res) => {
        let rawdata = fs.readFileSync('./json/news.json');
        let news = JSON.parse(rawdata);
        res.json(news);
    });
};