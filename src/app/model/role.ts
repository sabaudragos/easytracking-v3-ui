export class Role {
  id: number;
  roleName: string;

  public static getBlankRole(): Role {
    return new Role();
  }
}


