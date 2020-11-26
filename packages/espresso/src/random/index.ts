/**
 * Generate random numbers with specified digits, such as random integers between (0-10)
 *
 * start `number` Starting point
 *
 * end `number`   End position
 */
export const randomNum = (start: number, end: number): number => {
  if (start >= end) console.log('Not allowed start >= end');
  return Math.floor(Math.random() * (start - end)) + end;
};
