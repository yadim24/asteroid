export const formatDistanceLunar = (distance: string): string => {
  const options = { maximumFractionDigits: 0 };
  const formattedDistanceLunar = parseFloat(distance).toLocaleString(
    'ru-RU',
    options,
  );

  switch (formattedDistanceLunar.at(-1)) {
    case '1':
      return `${formattedDistanceLunar} лунная орбита`;
    case '2':
    case '3':
    case '4':
      return `${formattedDistanceLunar} лунные орбиты`;
    default:
      return `${formattedDistanceLunar} лунных орбит`;
  }
};
