export const formatDistanceKm = (distance: string): string => {
  const options = { maximumFractionDigits: 0 };

  return `${parseFloat(distance).toLocaleString('ru-RU', options)} км`;
};
