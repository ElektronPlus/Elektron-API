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
    getSubLessons: function () {
        const { JSDOM } = jsdom;
        let todaySubLessons, todaySubLessonsDay, nextDay;
        let nextDaySubLessons, nextDaySubLessonsDay;
        
        got("https://zseis.zgora.pl/zastepstwa.php").then(response => {
            const dom = new JSDOM(response.body).window.document;
            dom.querySelectorAll('.content_start span').forEach(day => {
                todaySubLessonsDay = day.textContent
            });
            dom.querySelectorAll('div.zast').forEach(subLessons => {
                todaySubLessons = subLessons.innerHTML
                todaySubLessons = todaySubLessons.replace(/<br\s*[\/]?>/gi, "\n")
                todaySubLessons = todaySubLessons.replace(/<[^>]*>?/gm, '')
                todaySubLessons = todaySubLessons.replace('&nbsp;', '')
                todaySubLessons = todaySubLessons.slice(0, -12);
            });
            dom.querySelectorAll('a.stand').forEach(link => {
                if(link.textContent != "Archiwum"){
                    nextDay = link.getAttribute('href')
                }
            });      
            if(nextDay){
                got("https://zseis.zgora.pl/"+nextDay).then(response => {
                    const dom = new JSDOM(response.body).window.document;
                    dom.querySelectorAll('.content_start span').forEach(day => {
                        nextDaySubLessonsDay = day.textContent
    
                    });
                    dom.querySelectorAll('div.zast').forEach(subLessons => {
                        nextDaySubLessons = subLessons.innerHTML
                        nextDaySubLessons = nextDaySubLessons.replace(/<br\s*[\/]?>/gi, "\n")
                        nextDaySubLessons = nextDaySubLessons.replace(/<[^>]*>?/gm, '')
                        nextDaySubLessons = nextDaySubLessons.replace('&nbsp;', '')
                        nextDaySubLessons = nextDaySubLessons.slice(0, -12);
                    });

                    let result = {
                        todaySubLessonsDay: todaySubLessonsDay ?? "",
                        todaySubLessons: todaySubLessons ?? "brak zastępstw",
                        nextDaySubLessonsDay: nextDaySubLessonsDay ?? "",
                        nextDaySubLessons: nextDaySubLessons ?? "brak zastępstw"
                    }
                    const jsonContent = JSON.stringify(result);
                    fs.writeFile("./json/subLessons.json", jsonContent, 'utf8', function (err) {
                        if (err) {
                            return console.log("Błąd zapisu newsow: "+err);
                        }
                    });  
                }).catch(err => {
                    console.log("Błąd pobrania zastępstw na next day: "+err);
                });
            }else{
                let result = {
                    todaySubLessonsDay: todaySubLessonsDay ?? "",
                    todaySubLessons: todaySubLessons ?? "brak zastępstw",
                    nextDaySubLessonsDay: nextDaySubLessonsDay ?? "",
                    nextDaySubLessons: nextDaySubLessons ?? "brak zastępstw"
                }
                const jsonContent = JSON.stringify(result);
                fs.writeFile("./json/subLessons.json", jsonContent, 'utf8', function (err) {
                    if (err) {
                        return console.log("Błąd zapisu newsow: "+err);
                    }
                });  
            }
        }).catch(err => {
            console.log("Błąd pobrania zastępstw: "+err);
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