/**
 * Calculates the days until the next birthday. If the birthday is today, it will be postponed to next year.
 * @param {Date} currentDate The current date object.
 * @param {String} employeeBirthdate The birthdate string in 'yyyy-mm-dd' format.
 * @returns {Number} Number of days until the next birthday.
 */
function daysUntilNextBirthday(currentDate, employeeBirthdate) {
  const currentYear = currentDate.getFullYear();
  const nextBirthday = new Date(employeeBirthdate);

  nextBirthday.setFullYear(currentYear);

  if (nextBirthday <= currentDate) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  const timeDiff = nextBirthday - currentDate;
  const daysUntilNextBirthday = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysUntilNextBirthday;
}

/**
 * Formats the given date string to the format 'dd.mm.yyyy'.
 * @param {String} birthdate The birthdate string in 'yyyy-mm-dd' format.
 * @returns {String} Date string in format 'dd.mm.yyyy'.
 */
function formatBirthdate(birthdate) {
  const dateArr = birthdate.split('-');

  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
}

/**
 * Formats the given date object to the format 'dd.mm.yyyy'.
 * @param {Date} date A date object.
 * @returns {String} Date string in format 'dd.mm.yyyy'.
 */
function formatCurrentDate(date) {
  return formatBirthdate(date.toISOString().split('T')[0]);
}

export { daysUntilNextBirthday, formatBirthdate, formatCurrentDate };
