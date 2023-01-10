import { AddressType } from "../types/UserTypes";

export const transformZipString = (rawZip: string): string => {
  const firstPart = rawZip.slice(0, 5);
  const secondPart = rawZip.slice(5);
  return `${firstPart}-${secondPart}`;
};

export const transformAddressString = (rawAddress: AddressType): string => {
  const street = rawAddress.street;
  const city = rawAddress.city;
  const state = rawAddress.state;
  const zip = transformZipString(rawAddress.zip);

  return `${street} - ${city} - ${state} - ${zip}`;
};
