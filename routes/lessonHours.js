const lessonHours = require('../json/lessonHours.json')
const lessonHoursShort = require('../json/lessonShort.json')
const Database = require("../Database");
module.exports = function (app) {
    app.get("/lessonHours", (req, res) => {
        Database.isShortLessons().then(result => {
            if(result){
                res.json(lessonHoursShort);
            }else{
                res.json(lessonHours);
            }
        })
    });
};