const Database = require("../Database");
const { AuthenticationSecret } = require("../tajne.json");

module.exports = function (app) {
    app.post("/admin/insertNews", (req, res) => {
        let content = req.body.content;
        let time = Math.floor(Date.now() / 1000);

        let authSecret = req.header("Auth-key");
        if (!authSecret || authSecret !== AuthenticationSecret) {
            res.status(401).json({ "error": "401 Unauthorised" });
        } else {
            if (!content) {
                res.status(400).json({ "error": "400 Bad Request" });
            } else {
                Database.insertNews(title, content, time)
                res.send("Poszło")
            }
        }
    });
};