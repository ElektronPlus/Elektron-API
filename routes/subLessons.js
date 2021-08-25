const fs = require('fs');
module.exports = function (app) {
    app.get("/subLessons", (req, res) => {
        let rawdata = fs.readFileSync('./json/subLessons.json');
        let subLessons = JSON.parse(rawdata);
        res.json(subLessons);
    });
};