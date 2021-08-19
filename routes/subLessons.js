const subLessons = require('../json/subLessons.json')
module.exports = function (app) {
    app.get("/subLessons", (req, res) => {
        res.json(subLessons);
    });
};