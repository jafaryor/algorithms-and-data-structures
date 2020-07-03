/**
 * Comparator Function signature.
 */
export type ComparatorFunction<T> = (a: T, b: T) => number;

/**
 * Is Equal Comparator Function signature.
 */
export type EqualFunction<T> = (a: T, b: T) => boolean;

/**
 * Extreme interface.
 */
export interface Extremes {
    min: number;
    max: number;
}
