import axios from "axios";
export const getToken = () => {
  try {
    return (localStorage.getItem("token") || sessionStorage.getItem("token")) ?? "";
  } catch (error) {
    return error;
  }
};

export const getUserId = () => {
  try {
    return (localStorage.getItem("userId") || sessionStorage.getItem("userId")) ?? "";
  } catch (error) {
    return error;
  }
};

export const setInfoLocalStorage = (userInfo: { userId: string; token: string }) => {
  try {
    localStorage.setItem("token", userInfo.token);
    localStorage.setItem("userId", userInfo.userId);
  } catch (error) {}
};

export const setInfoSessionStorage = (userInfo: { userId: string; token: string }) => {
  try {
    sessionStorage.setItem("token", userInfo.token);
    sessionStorage.setItem("userId", userInfo.userId);
    sessionStorage.setItem("isAuth", "true");
  } catch (error) {}
};

export const verifyToken = async () => {
  try {
    const userId = getUserId();
    const tokenString = getToken();
    await axios.post("http://localhost:4000/verify-token", { data: { tokenString, userId } });

    return true;
  } catch (error) {
    return false;
  }
};
