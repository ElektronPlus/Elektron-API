const Database = require("../Database");

module.exports = function (app) {
    app.get("/luckyNumber", (req, res) => {
        Database.getLuckyNumber().then((data) => {
            res.status(200).send(data);
        })
    });
};