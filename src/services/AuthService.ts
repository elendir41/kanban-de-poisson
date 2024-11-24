import JwtResponse from "@/models/jwt-response.type.ts";
import {AxiosInstance, isAxiosError} from "axios";
import Response from "@/models/response.type.ts";
import User from "@/models/user.type.ts";

export default class AuthService {
  private readonly service: AxiosInstance;

  constructor(axiosService: AxiosInstance) {
    this.service = axiosService;
  }

  login = async (username: string, password: string): Promise<Response<JwtResponse>> => {
    try {
      const res = await this.service.post(`login`, {username, password});
      const data = res.data as JwtResponse

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));
      this.service.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;

      return {data: res.data};
    } catch (error) {
      if (isAxiosError(error)) {
        return {error: error.response?.data};
      }

      return {error: {message: "une erreur est survenu"}};
    }
  }

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete this.service.defaults.headers.common["Authorization"];
  }

  register = async (username: string, password: string): Promise<Response<User>> => {
    try {
      const res = await this.service.post<User>('/register', {username, password});
      return {data: res.data};
    } catch (error) {
      if (isAxiosError(error)) {
        return {error: error.response?.data};
      }

      return {error: {message: "une erreur est survenu"}};
    }
  }
}
