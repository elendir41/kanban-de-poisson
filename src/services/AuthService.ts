import JwtResponse from "@/models/jwt-response.type.ts";
import {AxiosInstance, isAxiosError} from "axios";
import Response from "@/models/response.type.ts";

export default class AuthService {
  private readonly service: AxiosInstance;

  constructor(axiosService: AxiosInstance) {
    this.service = axiosService;
  }

  checkPasswordValidity = (password: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,24}$/;
    return regex.test(password);
  }

  login = async (username: string, password: string): Promise<Response<JwtResponse>> => {
    try {
      const res = await this.service.post(`login`, {username, password});
      const data = res.data as JwtResponse

      localStorage.setItem("token", data.jwt);
      this.service.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;

      return {data: res.data};
    } catch (error) {
      if (isAxiosError(error)) {
        return {error: error.response?.data};
      }

      return {error: "une erreur est survenu"};
    }
  }

  logout = () => {
    localStorage.removeItem("token");
    delete this.service.defaults.headers.common["Authorization"];
  }

  register = async (username: string, password: string): Promise<Response<{ id: string, name: string }>> => {
    if (!this.checkPasswordValidity(password)) {
      return {error: "Password does not meet requirements"}
    }

    try {
      const res = await this.service.post<{ id: string, name: string }>('/register', {username, password});
      return {data: res.data};
    } catch (error) {
      if (isAxiosError(error)) {
        return {error: error.response?.data};
      }

      return {error: "une erreur est survenu"}
    }
  }
}
