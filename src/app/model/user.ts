import {Role} from "./role";
import {Task} from './task';

export class User {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  roleList: Role[];
  tasks: Task[];

  public static getBlankUser(): User {
    return new User();
  }
}


