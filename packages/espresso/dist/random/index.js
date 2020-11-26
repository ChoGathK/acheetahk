"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNum = void 0;
/**
 * Generate random numbers with specified digits, such as random integers between (0-10)
 *
 * start `number` Starting point
 *
 * end `number`   End position
 */
const randomNum = (start, end) => {
    if (start >= end)
        console.log('Not allowed start >= end');
    return Math.floor(Math.random() * (start - end)) + end;
};
exports.randomNum = randomNum;
//# sourceMappingURL=index.js.map