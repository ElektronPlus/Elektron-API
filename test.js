const moment = require('moment');
moment.locale('pl');
let format = "HH:mm"

let test = moment('12:00', format)

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
let now = moment().utc().local();


if(test.isBetween(lesson1Start, lesson1End) || test.isSame(lesson1Start) || test.isSame(lesson1End)){
    countDuration("Lekcja", 1, test, lesson1Start, lesson1End)
}else if(test.isBetween(lesson1End, lesson2Start)){
    countDuration("Przerwa", 1, test, lesson1End, lesson2Start)
}else if(test.isBetween(lesson2Start, lesson2End) || test.isSame(lesson2Start) || test.isSame(lesson2End)){
    countDuration("Lekcja", 2, test, lesson2Start, lesson2End)
}else if(test.isBetween(lesson2End, lesson3Start)){
    countDuration("Przerwa", 2, test, lesson2End, lesson3Start)
}else if(test.isBetween(lesson3Start, lesson3End) || test.isSame(lesson3Start) || test.isSame(lesson3End)){
    countDuration("Lekcja", 3, test, lesson3Start, lesson3End)
}else if(test.isBetween(lesson3End, lesson4Start)){
    countDuration("Przerwa", 3, test, lesson3End, lesson4Start)
}else if(test.isBetween(lesson4Start, lesson4End) || test.isSame(lesson4Start) || test.isSame(lesson4End)){
    countDuration("Lekcja", 4, test, lesson4Start, lesson4End)
}else if(test.isBetween(lesson4End, lesson5Start)){
    countDuration("Przerwa", 4, test, lesson4End, lesson5Start)
}else if(test.isBetween(lesson5Start, lesson5End) || test.isSame(lesson5Start) || test.isSame(lesson5End)){
    countDuration("Lekcja", 5, test, lesson5Start, lesson5End)
}else if(test.isBetween(lesson5End, lesson6Start)){
    countDuration("Przerwa", 5, test, lesson5End, lesson6Start)
}else if(test.isBetween(lesson6Start, lesson6End) || test.isSame(lesson6Start) || test.isSame(lesson6End)){
    countDuration("Lekcja", 6, test, lesson6Start, lesson6End)
}else if(test.isBetween(lesson6End, lesson7Start)){
    countDuration("Przerwa", 6, test, lesson6End, lesson7Start)
}else if(test.isBetween(lesson7Start, lesson7End) || test.isSame(lesson7Start) || test.isSame(lesson7End)){
    countDuration("Lekcja", 7, test, lesson7Start, lesson7End)
}else if(test.isBetween(lesson7End, lesson8Start)){
    countDuration("Przerwa", 7, test, lesson7End, lesson8Start)
}else if(test.isBetween(lesson8Start, lesson8End) || test.isSame(lesson8Start) || test.isSame(lesson8End)){
    countDuration("Lekcja", 8, test, lesson8Start, lesson8End)
}else if(test.isBetween(lesson8End, lesson9Start)){
    countDuration("Przerwa", 8, test, lesson8End, lesson9Start)
}else if(test.isBetween(lesson9Start, lesson9End) || test.isSame(lesson9Start) || test.isSame(lesson9End)){
    countDuration("Lekcja", 9, test, lesson9Start, lesson9End)
}else if (test.isAfter(lesson9End) && test.isBefore(night)){
    console.log("Miłego popołudnia!")
}else if (test.isAfter(night) || test.isSame(night)){
    console.log("Miłego wieczoru!")
}else if (test.isBefore(lesson1Start)){
    console.log("Smacznej kawusi")
}

function countDuration (type, number, now, timeStart, timeEnd) {
    let duration = moment.duration(now.diff(timeEnd)).humanize();
    let percentage_complete = (now - timeStart) / (timeEnd - timeStart) * 100;
    let percentage_rounded = (Math.round(percentage_complete * 100) / 100)+"%";
    let result = {
        type: type,
        number: number,
        timeLeft: duration, 
        percentage: percentage_rounded
    }
    console.log(result)
    return result
}