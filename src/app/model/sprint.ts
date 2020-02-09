import {Task} from './task';

export class Sprint {
  id: number;
  sprintNumber: number;
  startDate: Date;
  endDate: Date;
  tasks: Task[];

  public static getBlankSprint(): Sprint {
    return new Sprint();
  }
}


