export class DateUtilService {
    constructor(){}

      /**
   * Converte uma string de data no formato ISO para um objeto Date.
   * @param dateString - A string de data no formato ISO.
   * @returns Um objeto Date correspondente à string de data.
   */
  public convertStringToDate(dateString: string): Date {
    return new Date(dateString);
  }

  /**
   * Converte um objeto Date para uma string no formato ISO esperado pelo LocalDateTime.
   * @param date - O objeto Date a ser convertido.
   * @returns Uma string no formato ISO.
   */
  public convertDateToISOString(date: Date): string {
    return date.toISOString();
  }
}