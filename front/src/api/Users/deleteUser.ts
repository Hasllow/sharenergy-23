import axios, { isAxiosError } from "axios";
import { getToken, getUserId, verifyToken } from "../helper/useToken";

export const deleteUser = async (id: string) => {
  const token = getToken();

  const isTokenValid = await verifyToken();
  if (!isTokenValid) return { detail: "Invalid token, please log out, then login again!" };

  const requestUserId = getUserId();

  try {
    const res = await axios.delete("http://localhost:4000/user", {
      headers: { Authorization: "Bearer " + token },
      data: { id, requestUserId },
    });
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
