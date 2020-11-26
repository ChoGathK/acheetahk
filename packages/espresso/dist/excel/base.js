"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excel = void 0;
/**
 * @see: https://github.com/exceljs/exceljs/blob/master/README_zh.md
 */
const exceljs_1 = require("exceljs");
class Excel {
    constructor() {
        this.workbook = new exceljs_1.Workbook();
    }
    /**
     * Create Excel Buffer
     */
    async createSimpleBuffer(rows) {
        this.workbook.addWorksheet('sheet').addRows(rows);
        const xlsxBuffer = await this.workbook.xlsx.writeBuffer();
        return xlsxBuffer;
    }
}
exports.Excel = Excel;
//# sourceMappingURL=base.js.map