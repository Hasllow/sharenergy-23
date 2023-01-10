interface AddressType {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface UserType {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  address: AddressType;
}
