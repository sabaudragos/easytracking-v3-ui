import {User} from "./user";
import {Sprint} from "./sprint";

export class Task {
  id: number;
  title: string;
  description: string;
  status: string;
  estimation: number;
  priority: number;
  user: User;
  sprint: Sprint;

  public static getBlankTask(): Task {
    return new Task();
  }
}


