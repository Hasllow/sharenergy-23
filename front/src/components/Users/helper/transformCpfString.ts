const transformCpfString = (rawCPF: string): string => {
  const firstPart = rawCPF.slice(0, 3);
  const secondPart = rawCPF.slice(3, 6);
  const thirdPart = rawCPF.slice(6, 9);
  const fourthPart = rawCPF.slice(9);

  return `${firstPart}.${secondPart}.${thirdPart}-${fourthPart}`;
};

export default transformCpfString;
