const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const Database = require("../Database");

module.exports = {
    getNews: function () {
        got("https://zseis.zgora.pl/index.php").then(response => {
            let news = [];
            let titles = [];
            let contents = [];
            let dates = [];

            const { JSDOM } = jsdom;
            const dom = new JSDOM(response.body).window.document;
            dom.querySelectorAll('div.news_title').forEach(title => {
              titles.push(title.textContent)
            });
            dom.querySelectorAll('div.news_content_text').forEach(content => {
              contents.push(content.textContent)
            });
            dom.querySelectorAll('span.news_modtext').forEach(date => {
              dates.push(date.textContent) 
            });
        
            if(titles.length > 0){
            titles.forEach((title, index) =>{
                let result = {
                    "title": titles[index],
                    "content": contents[index],
                    "date": dates[index]
                }
                news.push(result)
            })
            const jsonContent = JSON.stringify(news);
            fs.writeFile("./json/news.json", jsonContent, 'utf8', function (err) {
                if (err) {
                    return console.log("Błąd zapisu newsow: "+err);
                }
            }); 
            }
        }).catch(err => {
            console.log("Błąd pobrania newsow: "+err);
        });
    },
    drawLuckyNumber: function () {
        let today = new Date();
        let tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        let days = ['W Niedziele', 'W Poniedziałek', 'We Wtorek', 'W Środe', 'W Czwartek', 'W Piątek', 'W Sobote'];
        let d = new Date(tomorrow);
        let dayName = days[d.getDay()];
        let month = Math.floor(tomorrow.getMonth()+1);
        let data = " ("+tomorrow.getDate() + "." + month+"."+tomorrow.getFullYear()+")";
        let message = dayName+data+" zwolniony od odpowiedzi ustnej jest numer:";
        let draw = Math.floor(Math.random() * 30) + 1;
        Database.insertLuckyNumber(draw, message)
    }
}