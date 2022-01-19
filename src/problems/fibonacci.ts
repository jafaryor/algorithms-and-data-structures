/**
 * Computes the n-th Fibonacci number using Dynamic Programming.
 * @time- O(n)
 * @space- O(n)
 */
export function fibonacci(n: number): number {
    const fib = new Array<number>(n);

    fib[0] = 1;
    fib[1] = 1;

    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    return fib[n];
}
