export const cleanString = (string: string): string => {
  const pattern = /\W/g;
  return string.replaceAll(pattern, "");
};
