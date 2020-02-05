import {Task} from './task';

export class Sprint {
  id: number;
  sprintNumber: number;
  startDate: Date;
  endDate: Date;
  taskList: Task[];

  public static getBlankSprint(): Sprint {
    return new Sprint();
  }
}


