export default class Utils {
  public static fetchAsJson(url: string, requestOptions: any) {
    const response = UrlFetchApp.fetch(url, requestOptions);
    return JSON.parse(response.getContentText());
  }
  /**
   * truncate
   * @param value
   * @param length
   */
  public static truncate(value: string, length: number): string {
    if (value.length <= length) {
      return value;
    }
    return value.substring(0, length) + '...';
  }
  /**
   * setChatworkToken
   * @param token
   */
  public static setChatworkToken(token: string): void {
    PropertiesService.getScriptProperties().setProperty('CHATWORK_TOKEN', token);
  }
  /**
   * getChatworkToken
   */
  public static getChatworkToken(): string {
    return PropertiesService.getScriptProperties().getProperty('CHATWORK_TOKEN');
  }
  /**
   * checkNotEmpty
   */
  public static checkNotEmpty(value: string, message: string) {
    if (typeof value === 'undefined' || value == '') {
      throw new Error(message);
    }
  }
  /**
   * getConfigSheetName
   */
  public static getConfigSheetName(): string {
    return 'Config';
  }

  /**
   * getRoomSheetName
   */
  public static getRoomSheetName(): string {
    return 'Room';
  }
}
