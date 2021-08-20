const moment = require('moment');
moment.locale('pl');

module.exports = {
    getTime: async function () {
        return new Promise(promise => {
        let format = "HH:mm"
        //let now = moment('21:37', format)
        let now = moment().utc().local();
        let lesson1Start = moment('08:00', format)
        let lesson1End = moment('08:45', format)
        let lesson2Start = moment('08:50', format)
        let lesson2End = moment('09:35', format)
        let lesson3Start = moment('09:45', format)
        let lesson3End = moment('10:30', format)
        let lesson4Start = moment('10:35', format)
        let lesson4End = moment('11:20', format)
        let lesson5Start = moment('11:40', format)
        let lesson5End = moment('12:25', format)
        let lesson6Start = moment('12:30', format)
        let lesson6End = moment('13:15', format)
        let lesson7Start = moment('13:25', format)
        let lesson7End = moment('14:10', format)
        let lesson8Start = moment('14:15', format)
        let lesson8End = moment('15:00', format)
        let lesson9Start = moment('15:05', format)
        let lesson9End = moment('15:50', format)
        let night = moment('18:00', format)
        
        if(now.isBetween(lesson1Start, lesson1End) || now.isSame(lesson1Start) || now.isSame(lesson1End)){
            countDuration("Lekcja", 1, now, lesson1Start, lesson1End)
        }else if(now.isBetween(lesson1End, lesson2Start)){
            countDuration("Przerwa", 1, now, lesson1End, lesson2Start)
        }else if(now.isBetween(lesson2Start, lesson2End) || now.isSame(lesson2Start) || now.isSame(lesson2End)){
            countDuration("Lekcja", 2, now, lesson2Start, lesson2End)
        }else if(now.isBetween(lesson2End, lesson3Start)){
            countDuration("Przerwa", 2, now, lesson2End, lesson3Start)
        }else if(now.isBetween(lesson3Start, lesson3End) || now.isSame(lesson3Start) || now.isSame(lesson3End)){
            countDuration("Lekcja", 3, now, lesson3Start, lesson3End)
        }else if(now.isBetween(lesson3End, lesson4Start)){
            countDuration("Przerwa", 3, now, lesson3End, lesson4Start)
        }else if(now.isBetween(lesson4Start, lesson4End) || now.isSame(lesson4Start) || now.isSame(lesson4End)){
            countDuration("Lekcja", 4, now, lesson4Start, lesson4End)
        }else if(now.isBetween(lesson4End, lesson5Start)){
            countDuration("Przerwa", 4, now, lesson4End, lesson5Start)
        }else if(now.isBetween(lesson5Start, lesson5End) || now.isSame(lesson5Start) || now.isSame(lesson5End)){
            countDuration("Lekcja", 5, now, lesson5Start, lesson5End)
        }else if(now.isBetween(lesson5End, lesson6Start)){
            countDuration("Przerwa", 5, now, lesson5End, lesson6Start)
        }else if(now.isBetween(lesson6Start, lesson6End) || now.isSame(lesson6Start) || now.isSame(lesson6End)){
            countDuration("Lekcja", 6, now, lesson6Start, lesson6End)
        }else if(now.isBetween(lesson6End, lesson7Start)){
            countDuration("Przerwa", 6, now, lesson6End, lesson7Start)
        }else if(now.isBetween(lesson7Start, lesson7End) || now.isSame(lesson7Start) || now.isSame(lesson7End)){
            countDuration("Lekcja", 7, now, lesson7Start, lesson7End)
        }else if(now.isBetween(lesson7End, lesson8Start)){
            countDuration("Przerwa", 7, now, lesson7End, lesson8Start)
        }else if(now.isBetween(lesson8Start, lesson8End) || now.isSame(lesson8Start) || now.isSame(lesson8End)){
            countDuration("Lekcja", 8, now, lesson8Start, lesson8End)
        }else if(now.isBetween(lesson8End, lesson9Start)){
            countDuration("Przerwa", 8, now, lesson8End, lesson9Start)
        }else if(now.isBetween(lesson9Start, lesson9End) || now.isSame(lesson9Start) || now.isSame(lesson9End)){
            countDuration("Lekcja", 9, now, lesson9Start, lesson9End)
        }else if (now.isAfter(lesson9End) && now.isBefore(night)){
            promise({type: "afternoon"});
        }else if (now.isAfter(night) || now.isSame(night)){
            promise({type: "evening"});
        }else if (now.isBefore(lesson1Start)){
            promise({type: "morning"});
        }else{
            promise({error: true});
        }

        function countDuration (type, number, now, timeStart, timeEnd) {
            let duration = moment.duration(now.diff(timeEnd)).humanize();
            let percentage_complete = (now - timeStart) / (timeEnd - timeStart) * 100;
            let percentage_rounded = (Math.round(percentage_complete) / 100);
            let result = {
                type: type,
                number: number,
                timeLeft: duration, 
                percentage: percentage_rounded
            }
            promise(result);
        }
    })
    }
  };