const busStops = require('../json/busStops.json')
module.exports = function (app) {
    app.get("/busStops", (req, res) => {
        res.json(busStops);
    });
};