const moment = require('moment');
moment.locale('pl');

const lastFridayForMonth = function (monthMoment) {
    var lastDay = monthMoment.endOf('month').startOf('day');
    switch (lastDay.day()) {
      case 6:
        return lastDay.subtract(1, 'days');
      default:
        return lastDay.subtract(lastDay.day() + 2, 'days');
    }
  }

module.exports = {
    countVacation: function () {
        let now = moment().utc().local()
        let start = moment().year(now.year()).month(8).date(1).day(8);
        if (start.date() > 7) start.day(-6);
        let end = lastFridayForMonth(moment().year(now.year() + 1).month(5));

        let daysTotal = end.diff(start, 'days')
        let daysLeft = end.diff(now, 'days')+1
        let procent = 1 - (daysLeft / daysTotal)

        return ({daysTotal: daysTotal, daysLeft: daysLeft, procent: procent})
    }
}
