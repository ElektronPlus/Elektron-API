const Database = require("../Database");
const Lesson = require("../Utils/Lesson");

module.exports = function (app) {
    app.get("/home", (req, res) => {
        Database.getNewsList().then((data) => {
            let news = data
            Lesson.getTime().then((data) => {
                let lesson = data
                Database.getLuckyNumber().then((data) => {
                    let luckyNumber = data
                    res.status(200).send({news: news, lesson: lesson, luckyNumber: luckyNumber});
                })
            })
        })   
    });
};