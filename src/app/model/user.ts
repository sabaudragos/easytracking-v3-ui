import {Role} from "./role";

export class User {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  roleList: Role[];

  public static getBlankUser(): User {
    return new User();
  }
}


