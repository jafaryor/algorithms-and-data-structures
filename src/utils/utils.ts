export interface IExtremes {
    min: number;
    max: number;
}

/**
 * swaps two item in place
 * @param array
 * @param firstIndex
 * @param secondIndex
 */
export function swap(array: number[], firstIndex: number, secondIndex: number): void {
    if (firstIndex === secondIndex) return;

    [array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]];
}

/**
 * generates random number from [min, max] range
 * @param min - min range value
 * @param max - max range value
 */
export const randomFromRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * randomizez the array items
 * @complexity: O(n)
 * @param array
 */
export function shuffle(array: any[]): any[] {
    const randomIndex = () => randomFromRange(0, array.length - 1);

    for (let i = 0; i < array.length; ++i) {
        swap(array, i, randomIndex());
    }

    return array;
}

/**
 * finds max and min in the array
 * @complexity - O(n)
 * @param array
 */
export function findExtremes(array: number[]): IExtremes {
    return array.reduce(
        (extreme, item) => ({
            min: Math.min(extreme.min, item),
            max: Math.max(extreme.max, item)
        }),
        { min: Infinity, max: -Infinity }
    );
}

/**
 * returns i-th digit from number 'n'
 * @param {number} n
 * @param {index} i - zero-based index
 * @returns {number}
 */
export function digitOf(n: number, i: number = 0): number | undefined {
    const digit: string = String(n).charAt(i);

    return digit === '' ? undefined : Number(digit);
}

/**
 * returns last digit from number 'n'
 * @param {number} n
 * @param {index} i - zero-based index
 * @returns {number}
 */
export function lastDigitOf(n: number): number | undefined {
    const lastDigitIndex = String(n).length - 1;
    const digit: string = String(n).charAt(lastDigitIndex);

    return digit === '' ? undefined : Number(digit);
}
