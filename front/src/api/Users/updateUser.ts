import axios, { isAxiosError } from "axios";
import { UserType } from "../../components/Users/types/UserTypes";
import { getToken, getUserId, verifyToken } from "../helper/useToken";
import cleanUser from "./helpers/cleanUser";
import { isUserValid } from "./isUserValid";

export const updateUser = async (user: UserType) => {
  const token = await getToken();

  const isTokenValid = await verifyToken();
  if (!isTokenValid) return { detail: "Invalid token, please log out, then login again!" };

  const userClean: UserType = cleanUser(user);
  const requestUserId = getUserId();

  try {
    if (!isUserValid(userClean)) throw new Error("User missing values!");

    const res = await axios.put(
      "http://localhost:4000/user",
      { user: userClean, requestUserId },
      { headers: { Authorization: "Bearer " + token } }
    );
    const data = res.data;
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }
    if (error instanceof Error) {
      return error.message;
    }
  }
};
