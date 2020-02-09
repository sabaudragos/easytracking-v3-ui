export class AppConstants {
  public static SERVER_URL = '/api/v3';
  public static SPRINT_URL = AppConstants.SERVER_URL + '/sprint';
  public static TASK_URL = AppConstants.SERVER_URL + '/task';
  public static USER_URL = AppConstants.SERVER_URL + '/user';
  public static LOGIN_URL = AppConstants.USER_URL + '/authenticate';
  public static BACKLOG_URL = AppConstants.SERVER_URL + '/backlog';
}
