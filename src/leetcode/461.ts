/**
 * The Hamming distance between two integers is the number of positions at which
 * the corresponding bits are different (in binary representation).
 * Given two integers x and y, calculate the Hamming distance.
 * @param x
 * @param y
 * @return Hamming distance
 */
export function hummingDistance(x: number, y: number): number {
    const a = Array.from(x.toString(2)).reverse();
    const b = Array.from(y.toString(2)).reverse();
    const maxLength = a.length > b.length ? a.length : b.length;
    let counter = 0;

    for (let i = 0; i < maxLength; i++) {
        // fill with '0' if there is a gap in binary representation
        if (a[i] === undefined) {
            a[i] = '0';
        } else if (b[i] === undefined) {
            b[i] = '0';
        }

        if (a[i] !== b[i]) {
            ++counter;
        }
    }

    return counter;
}
