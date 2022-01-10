const formatTime = (date) => {
  let diff = new Date().getTime() - new Date(date).getTime();
  let dateContent;
  if (diff < 1000) {
    dateContent = `right now`;
    return dateContent;
  }

  let sec = Math.floor(diff / 1000);

  if (sec < 60) {
    dateContent = `few seconds ago`;
    return dateContent;
  }

  let min = Math.floor(diff / 60000);
  if (min < 60) {
    dateContent = `${min} minutes ago`;
    return dateContent;
  }

  let hour = Math.floor(diff / 3600000);
  if (hour < 24) {
    dateContent = `${hour} hours ago`;
    return dateContent;
  }

  let day = Math.floor(diff / 86400000);
  if (day < 31) {
    dateContent = `${day} days ago`;
    return dateContent;
  }

  let month = Math.floor(diff / 2629746000);
  if (month < 12) {
    dateContent = `${month} months ago`;
    return dateContent;
  }

  let year = Math.floor(diff / 31556952000);
  if (year < 100000) {
    dateContent = `${year} years ago`;
    return dateContent;
  }
};

export default formatTime;
