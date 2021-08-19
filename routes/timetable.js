const plan = require('../json/planyLekcji.json')

module.exports = function (app) {
    app.get("/timetable", (req, res) => {
        res.json(plan);
    });
};