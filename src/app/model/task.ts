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
    let task = new Task();
    task.id = 1;
    task.estimation = 1;
    task.priority = 1;
    task.description = 'some description';
    task.status = 'new';

    let user = User.getBlankUser();
    user.firstName = "Dragos";
    task.user = user;

    return task;
  }
}


