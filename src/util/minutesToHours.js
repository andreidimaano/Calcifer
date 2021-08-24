const moment = require("moment");

module.exports = {
  formatDuration: (totalMinutes) => {
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    let hourSingularOrPlural = hours === 1 ? "hour" : "hours";

    return hours === 0
      ? `${minutes} minutes`
      : `${hours} ${hourSingularOrPlural} ${minutes} minutes`;
  },
};
