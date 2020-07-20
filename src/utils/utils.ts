import * as _ from 'lodash';
import {Extremes} from './types';

/**
 * swaps two item in place
 * @param array
 * @param firstIndex
 * @param secondIndex
 */
export function swap(
    array: any[],
    firstIndex: number,
    secondIndex: number
): void {
    if (firstIndex === secondIndex) return;

    [array[firstIndex], array[secondIndex]] = [
        array[secondIndex],
        array[firstIndex],
    ];
}

/**
 * generates random number from [min, max] range
 * @param min - min range value
 * @param max - max range value
 */
export const randomFromRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

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
export function findExtremes(array: number[]): Extremes {
    return array.reduce(
        (extreme, item) => ({
            min: Math.min(extreme.min, item),
            max: Math.max(extreme.max, item),
        }),
        {min: Infinity, max: -Infinity}
    );
}

/**
 * optimized option of the findExtremes utility function
 * @complexity - O(3n/2)
 * @param array
 */
export function findMinAndMax(array: number[]): Extremes {
    let index = 0;
    let max = Infinity;
    let min = -Infinity;

    if (array.length % 2 !== 0) {
        min = array[0];
        max = array[0];
        index = 1;
    }

    for (; index < array.length; index += 2) {
        if (array[index - 1] < array[index]) {
            max = Math.max(max, array[index]);
            min = Math.min(min, array[index - 1]);
        } else {
            max = Math.max(max, array[index - 1]);
            min = Math.min(min, array[index]);
        }
    }

    return {min, max};
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

/**
 * Primality Test.
 * Checks if the number is prime.
 * @reference: https://en.wikipedia.org/wiki/Primality_test
 * @complexity: O(sqrt(n))
 */
export function isPrime(n: number): boolean {
    // Corner case
    if (n <= 3) return n > 1;
    // This is checked so that we can skip middle five numbers in below loop
    else if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    return true;
}

/**
 * The function finds the closest prime, which is greater than the number.
 * `Bertrand's postulate` states:
 *   for every `n>1` there is always at least one prime `p` such that `n<p<2n`.
 * @reference: https://en.wikipedia.org/wiki/Bertrand%27s_postulate
 * @complexity: O(n*sqrt(n))
 */
export function findClosestBiggerPrimeNumber(n: number): number {
    for (let i = n; i < 2 * n; i++) {
        if (isPrime(i)) return i;
    }

    return 0;
}

/**
 * The function finds the closest prime, which is smaller than the number.
 * `Bertrand's postulate` states:
 *   for every `n>1` there is always at least one prime `p` such that `n/2<p<n`.
 * @complexity: O(n*sqrt(n))
 */
export function findClosestSmallerPrimeNumber(n: number): number {
    for (let i = n; i > n / 2; i--) {
        if (isPrime(i)) return i;
    }

    return 0;
}

/**
 * Replaces the method with the provided function starting from
 * the specified context and all the way down along the prototype chain,
 * until the native object prototype is reached.
 */
export function replaceMethodInContext(
    methodName: string,
    replaceTo: Function,
    inContext: object
): void {
    let currentContext = inContext;

    do {
        if (currentContext.hasOwnProperty(methodName)) {
            // tslint:disable-next-line: no-any
            (currentContext as any)[methodName] = replaceTo;
        }

        currentContext = Object.getPrototypeOf(currentContext);
    } while (!currentContext.hasOwnProperty('valueOf'));
}

/**
 * Creates and array of sze "size" and fills it with "value".
 */
export function createArrayAndFillWith<T>(size: number, value: T): T[] {
    return _.times(size, _.constant(value));
}
