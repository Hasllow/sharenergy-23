import axios from "axios";
const apiLogin = async (username: string, password: string) => {
  try {
    const data = await axios.post("http://localhost:4000/login", { username, password });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      return error;
    }
  }
};

export default apiLogin;
