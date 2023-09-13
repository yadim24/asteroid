export const formatSpeed = (speed: string): string => {
  const options = { maximumFractionDigits: 2 };

  return `${parseFloat(speed).toLocaleString('ru-RU', options)} км/сек`;
};
