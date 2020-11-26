/**
 * @see: https://github.com/exceljs/exceljs/blob/master/README_zh.md
 */
import { Workbook } from 'exceljs';
export declare class Excel {
    workbook: Workbook;
    constructor();
    /**
     * Create Excel Buffer
     */
    createSimpleBuffer(rows: any[]): Promise<import("exceljs").Buffer>;
}
