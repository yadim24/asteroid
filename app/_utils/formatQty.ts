export const formatQty = (qty: number): string => {
  switch (qty.toString().at(-1)) {
    case '1':
      return `${qty} астероид`;
    case '2':
    case '3':
    case '4':
      return `${qty} астероида`;
    default:
      return `${qty} астероидов`;
  }
};
