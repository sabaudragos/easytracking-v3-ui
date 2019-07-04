export class Sprint {
  id: number;
  sprintNumber: number;
  startDate: Date;
  endDate: Date;

  public static getBlankSprint(): Sprint {
    return new Sprint();
  }
}


