import axios, { AxiosInstance } from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

interface AuthTokens {
  access: string;
  refresh: string;
}

const baseURL = "http://127.0.0.1:8000/api";

const useAxios = (): AxiosInstance => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    const user = jwtDecode<AuthTokens>(authTokens.access);
    const isExpired = dayjs.unix((user as any).exp).diff(dayjs()) < 1;
    if (!isExpired) return req;

    try {
      const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authTokens.refresh
      });

      const newAuthTokens: AuthTokens = response.data;
      localStorage.setItem("authTokens", JSON.stringify(newAuthTokens));
      setAuthTokens(newAuthTokens);
      setUser(jwtDecode(newAuthTokens.access));

      req.headers.Authorization = `Bearer ${newAuthTokens.access}`;
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Optionally, handle token refresh failure here
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;
