import axios from "axios";
import { UserType } from "../../components/Users/types/UserTypes";

interface getUsersActions {
  data?: UserType[];
  error?: unknown;
}

export const getUsers = async (): Promise<getUsersActions> => {
  try {
    const res = await axios.get("http://localhost:4000/users");
    const data = res.data;
    return { data };
  } catch (error) {
    return { error };
  }
};
