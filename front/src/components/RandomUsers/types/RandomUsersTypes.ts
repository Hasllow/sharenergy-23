export interface RandomUserType {
  name: string;
  age: number;
  email: string;
  username: string;
  image: string;
}

export interface RandomUserProps {
  user: RandomUserType;
}

export interface RandomUserTypeApi {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export interface ResponseRandomUserApi {
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
  results: RandomUserTypeApi[];
}
