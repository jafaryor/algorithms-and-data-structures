/**
 * Finds the Greatest Common Divisor (GCD) of two numbers.
 * @time O(lg b)
 */
export function euclid(a: number, b: number): number {
    if (b === 0) {
        return a;
    } else {
        return euclid(b, a % b);
    }
}

/**
 * Finds the Greatest Common Divisor (GCD) of two numbers in iterative manner.
 * @time O(lg b)
 */
export function euclidIterative(a: number, b: number): number {
    let temp: number;

    while (b !== 0) {
        temp = a;
        a = b;
        b = temp % b;
    }

    return a;
}

/**
 * Extended Euclidean algorithm, which return gcd(a, b) = ax + by.
 * @note the "a: and "b" must be non-negative numbers.
 * @time O(lg b) since the number of recursive is equals
 *               to number of recursive calls of euclid() function.
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

/**
 * Finds the Least Common Multiple of two numbers.
 * @note the "a" and "b" must be non-zero numbers.
 */
export function lcm(a: number, b: number): number {
    return Math.abs(a * b) / euclidIterative(a, b);
}
