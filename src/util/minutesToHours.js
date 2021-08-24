const moment = require("moment");

module.exports = {
  formatDuration: (totalMinutes) => {
  
  let num = totalMinutes;
  let hours = (num / 60);
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
    // const duration = moment.duration(totalMinutes * 60000);

    // let m = "";
    // let h = "";
    // let d = "";
    // let mo = "";
    // let y = "";

    // if (duration._data.minutes !== 0) {
    //   let s = duration._data.minutes !== 1 ? "s" : "";
    //   m = `${duration._data.minutes} minute${s}`;
    // }

    // if (duration._data.hours !== 0) {
    //   let s = duration._data.hours !== 1 ? "s" : "";
    //   h = `${duration._data.hours} hour${s} `;
    // }

    // if (duration._data.days !== 0) {
    //   let s = duration._data.hours !== 1 ? "s" : "";
    //   d = `${duration._data.days} day${s} `;
    // }

    // if (duration._data.months !== 0) {
    //   let s = duration._data.months !== 1 ? "s" : "";
    //   mo = `${duration._data.months} mth${s} `;
    // }

    // if (duration._data.years !== 0) {
    //   let s = duration._data.years !== 1 ? "s" : "";
    //   y = `${duration._data.years} yr${s} `;
    // }



    return `${y}${mo}${d}${h}${m}`;
  },
};
