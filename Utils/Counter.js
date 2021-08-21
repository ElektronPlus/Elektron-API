const moment = require('moment');
moment.locale('pl');

module.exports = {
    countVacation: function () {
        let now = moment().utc().local()
        let start = moment("2021-09-01", "YYYY-MM-DD");
        let end = moment("2022-06-24", "YYYY-MM-DD");
        let daysTotal = end.diff(start, 'days')
        let daysLeft = end.diff(now, 'days')+1
        let procent = 1 - (daysLeft / daysTotal)

        return ({daysTotal: daysTotal, daysLeft: daysLeft, procent: procent})
    }
}