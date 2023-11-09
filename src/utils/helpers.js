function storeTokenInLocalStorage(token) {
    return localStorage.setItem('jwtToken', token);
}
  
function getTokenFromLocalStorage(key="jwtToken") {
    return localStorage.getItem(key);
}

function formatedPeriodForDisplay(dateString) {
  const currentDate = new Date();
  const postDate = new Date(dateString);
  const timeDifference = currentDate - postDate;
  const secondsInMinute = 60 * 1000;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;
  const secondsInWeek = 7 * secondsInDay;
  const secondsInMonth = 30 * secondsInDay;
  const secondsInYear = 365 * secondsInDay;

  if (timeDifference < secondsInMinute) {
    return 'Just now';
  } else if (timeDifference < secondsInHour) {
    const minutesAgo = Math.floor(timeDifference / secondsInMinute);
    return `${minutesAgo}m ago`;
  } else if (timeDifference < secondsInDay) {
    const hoursAgo = Math.floor(timeDifference / secondsInHour);
    return `${hoursAgo}h ago`;
  } else if (timeDifference < secondsInWeek) {
    const daysAgo = Math.floor(timeDifference / secondsInDay);
    if (daysAgo === 1) {
      return 'Yesterday';
    }
    return `${daysAgo}d ago`;
  } else if (timeDifference < secondsInMonth) {
    const weeksAgo = Math.floor(timeDifference / secondsInWeek);
    return `${weeksAgo}w ago`;
  } else if (timeDifference < secondsInYear) {
    const monthsAgo = Math.floor(timeDifference / secondsInMonth);
    return `${monthsAgo} months ago`;
  } else {
    const yearsAgo = Math.floor(timeDifference / secondsInYear);
    return `${yearsAgo} years ago`;
  }
}

export {
    storeTokenInLocalStorage,
    getTokenFromLocalStorage,
    formatedPeriodForDisplay
}