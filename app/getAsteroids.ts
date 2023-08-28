export const getAsteroids = async () => {
  const currentDate = new Date();
  const queryParams = new URLSearchParams({
    start_date: currentDate,
    api_key: KEY,
  });
};
