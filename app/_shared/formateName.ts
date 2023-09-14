export const formatName = (name: string): string => {
  if (name[0] !== '(') return name;

  return name.slice(1, name.length - 1);
};
