/**
 * Finds a Greatest Common Divisor (GCD) of two numbers.
 * @complexity O(lg b)
 */
export function euclid(a: number, b: number): number {
    if (b === 0) {
        return a;
    } else {
        return euclid(b, a % b);
    }
}

/**
 * Extended Euclidean algorithm, which return gcd(a, b) = ax + by.
 * @complexity O(lg b) since the number of recursive is equals
 *              to number of recursive calls of euclid() function.
 */
export function gcd(
    a: number,
    b: number,
): {
    gcd: number;
    x: number;
    y: number;
} {
    if (b === 0) {
        return {gcd: a, x: 1, y: 0};
    } else {
        const d = gcd(b, a % b);

        return {
            gcd: d.gcd,
            x: d.y,
            y: d.x - Math.floor(a / b) * d.y,
        };
    }
}
