import User from "./user.type";

type JwtResponse = {
  jwt: string;
  user: User;
};

export default JwtResponse;
