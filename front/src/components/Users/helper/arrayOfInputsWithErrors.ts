import { AddressType } from "../types/UserTypes";
import { ErrorsOnInput } from "./checkErrosOnInputs";

const arrayOfInputsWithErrors = (userErrors: ErrorsOnInput): string[] => {
  const arrayWithError = [];

  for (const key in userErrors) {
    if (userErrors[key as keyof ErrorsOnInput]) arrayWithError.push(key[0].toUpperCase() + key.slice(1));
  }

  for (const key in userErrors.address) {
    if (userErrors.address[key as keyof AddressType]) arrayWithError.push(key[0].toUpperCase() + key.slice(1));
  }

  if (arrayWithError.indexOf("Address") !== -1) arrayWithError.splice(arrayWithError.indexOf("Address"), 1);

  return arrayWithError;
};

export default arrayOfInputsWithErrors;
