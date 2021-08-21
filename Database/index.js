const admin = require("firebase-admin");
const serviceAccount = require("../tajne.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://elektronplusplus-76445.firebaseio.com"
});

let db = admin.database();
let newsRef = db.ref("Newsy");
let lnumberRef = db.ref("LuckyNumber");

module.exports = {
    insertNews: function(content, time) {
        newsRef.push().set({
            content: content,
            time: time
        }, (error) => {
            return error
        });
    },
    getNewsList: async function () {
        let news = [];
        return new Promise(promise => {
            newsRef.once("value", function(snapshot){
                if (snapshot.exists()) {
                    snapshot.forEach(function (data) {
                        news.push(data);
                    });
                    promise(news.reverse());
                } else {
                    promise(false)
                }
            })
        })
    },
    insertLuckyNumber: function(number, info) {
        lnumberRef.set({
            number: number,
            info: info
        });
    },
    getLuckyNumber: async function () {
        return new Promise(promise => {
            lnumberRef.once("value", function(snapshot){
                if (snapshot.exists()) {
                    promise(snapshot);
                } else {
                    promise({"error": true})
                }
            })
        })
    },
    isShortLessons: async function () {
        return new Promise(promise => {
            db.ref("shortLessons").once("value", function(snapshot){
                if (snapshot.exists()) {
                    promise(snapshot.val());
                } else {
                    promise(false)
                }
            })
        })
    },
}