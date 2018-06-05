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
