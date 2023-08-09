function daysUntilNextBirthday(currentDate, employeeBirthdate) {
  const currentYear = currentDate.getFullYear();
  const currentemployeeBirthday = new Date(employeeBirthdate).setFullYear(currentYear);
  const diffInMillSec = currentemployeeBirthday - currentDate;
  const diffInDays = Math.floor(diffInMillSec / (1000 * 60 * 60 * 24)) + 1;

  if (diffInDays < 0) {
    const nextemployeeBirthday = new Date(employeeBirthdate).setFullYear(currentYear + 1);
    const nextDiffInMillSec = nextemployeeBirthday - currentDate;
    const nextDiffInDays = Math.floor(nextDiffInMillSec / (1000 * 60 * 60 * 24) + 1);

    return nextDiffInDays;
  }

  return diffInDays;
}

function formatBirthdate(birthdate) {
  const dateArr = birthdate.split('-');

  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
}

function formatCurrentDate(date) {
  return formatBirthdate(date.toISOString().split('T')[0]);
}

export { daysUntilNextBirthday, formatBirthdate, formatCurrentDate };
