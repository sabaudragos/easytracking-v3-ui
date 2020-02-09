import {Sprint} from './sprint';
import {Task} from './task';

export class Backlog {
  sprints: Sprint[];
  backlogTasks: Task[];

  public static getBlankBackLog(): Backlog {
    return new Backlog();
  }
}


