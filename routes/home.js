const Database = require("../Database");
module.exports = function (app) {
    app.get("/home", (req, res) => {
        Database.getNewsList().then((data) => {
            if(!data) res.status(404).send("404 Not Found");
            else {
                res.status(200).send(data);
            }
        })
    });
};