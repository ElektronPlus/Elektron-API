const Database = require("../Database");
const Lesson = require("../Utils/Lesson");
const Counter = require("../Utils/Counter");
const moment = require('moment');
moment.locale('pl');

module.exports = function (app) {
    app.get("/home", (req, res) => {
        Database.getNewsList().then((data) => {
            let news = []
            data.forEach(e => {
                day = moment.unix(e.val().time);
                news.push({content: e.val().content, time: day.fromNow()})
            });
            Lesson.getTime().then((data) => {
                let lesson = data
                Database.getLuckyNumber().then((data) => {
                    let luckyNumber = data
                    let vacation = Counter.countVacation()
                    res.status(200).send({news: news, lesson: lesson, luckyNumber: luckyNumber, vacation: vacation });
                })
            })
        })   
    });
};