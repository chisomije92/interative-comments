const timeData = () => {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: "true",
  }).format(new Date());
};

export default timeData;
