/**
 * @see: https://github.com/exceljs/exceljs/blob/master/README_zh.md
 */
import { Workbook } from 'exceljs';

export class Excel {

  public workbook: Workbook;

  constructor() {
    this.workbook = new Workbook();
  }

  /**
   * Create Excel Buffer
   */
  async createSimpleBuffer(rows: any[]) {
    this.workbook.addWorksheet('sheet').addRows(rows);
    const xlsxBuffer = await this.workbook.xlsx.writeBuffer();
    return xlsxBuffer;
  }

}
