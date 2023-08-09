function daysUntilBirthday(currentDate, userBirthdate) {
  const currentYear = currentDate.getFullYear();
  const currentUserBirthday = new Date(userBirthdate).setFullYear(currentYear);
  const diffInMillSec = currentUserBirthday - currentDate;
  const diffInDays = Math.floor(diffInMillSec / (1000 * 60 * 60 * 24)) + 1;

  if (diffInDays < 0) {
    const nextUserBirthday = new Date(userBirthdate).setFullYear(currentYear + 1);
    const nextDiffInMillSec = nextUserBirthday - currentDate;
    const nextDiffInDays = Math.floor(nextDiffInMillSec / (1000 * 60 * 60 * 24) + 1);

    return nextDiffInDays;
  }

  return diffInDays;
}

function formatBirthdate(birthdate) {
  const dateArr = birthdate.split('-');

  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
}

export { daysUntilBirthday, formatBirthdate };
