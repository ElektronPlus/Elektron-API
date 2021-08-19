const news = require('../json/news.json')
module.exports = function (app) {
    app.get("/schoolNews", (req, res) => {
        res.json(news);
    });
};