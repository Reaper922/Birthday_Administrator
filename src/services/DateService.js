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

function formatBirthdate(birthdate) {
  const dateArr = birthdate.split('-');

  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
}

function formatCurrentDate(date) {
  return formatBirthdate(date.toISOString().split('T')[0]);
}

export { daysUntilNextBirthday, formatBirthdate, formatCurrentDate };
