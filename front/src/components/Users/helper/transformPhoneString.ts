const transformPhoneString = (rawPhone: string): string => {
  const firstPart = rawPhone.slice(0, 2);
  const secondPart = rawPhone.slice(2, 7);
  const thirdPart = rawPhone.slice(7);

  return `(${firstPart}) ${secondPart}-${thirdPart}`;
};

export default transformPhoneString;
