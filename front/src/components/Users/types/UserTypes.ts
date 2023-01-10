export interface AddressType {
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

export interface UserProps {
  user: UserType;
}

export type FormType = {
  openForm: boolean;
  onCloseForm: any;
  editStatus?: boolean;
  userInfo?: UserType | null;
  refreshUserInfo: () => void;
};

export interface ListItemUserProps {
  user: UserType;
  onClickEdit: (user: UserType) => void;
  onClickDelete: (user: UserType) => void;
}
