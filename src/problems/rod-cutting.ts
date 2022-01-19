/**
 * Given a rod of length n units, and the price of all pieces smaller than n,
 * find the most profitable way of cutting the rod.
 *
 * Let's designate the p as the function which
 * returns the price of rod length n using the const rodPriceTable.
 *
 * If we take a rod of length 4. There will be 2^(n - 1) ways of cutting it.
 * The cuts for rod of length 4 are:
 * 1 + 1 + 1 + 1: p(1) + p(1) + p(1) + p(1) = 1 + 1 + 1 + 1 = 4
 * 2 + 2: p(2) + p(2) = 5 + 5 = 10
 * 1 + 3: p(1) + p(3) = 1 + 8 = 9
 * 1 + 1 + 2: p(1) + p(1) + p(2) = 1 + 1 + 5 = 7
 * 4: p(4) = 9
 * As we can see, we get the max profit if we cut the rod of length 4
 * into two rods of length 2. It will give us 10$ profit.
 *
 * @see /images/rod-cutting-problem.png
 */
import {createArrayAndFillWith} from '../utils';

/**
 * The table of rod cuts by length.
 * The price for the rod of length 0 = 0$.
 * The price for the rod of length 1 = 1$.
 * The price for the rod of length 2 = 5$.
 * The price for the rod of length 3 = 8$.
 * The price for the rod of length 4 = 94.
 */
export const defaultRodPriceTable = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30];

/**
 * Takes as input an array of prices and an integer "length",
 * and it returns the maximum revenue possible for a rod of length.
 * @time- O(2^n)
 * @space- O(1)
 */
export function cutRod(
    length: number,
    priceTable: number[] = defaultRodPriceTable,
): number {
    if (length === 0) return 0;

    let price = -Infinity;

    for (let i = 1; i <= length; i++) {
        // Max profit is calculated based on dividing the rod into two pieces
        // and considering each piece as a separate problem.
        // So we end up cutting the rod recursively.
        price = Math.max(price, priceTable[i] + cutRod(length - i, priceTable));
    }

    return price;
}
/**
 * To analyze the running time of "cutRod", let T(n) denote the total
 * number of calls made to "cutRod" when called with its second parameter
 * equal ton.This expression equals the number of nodes in a subtree
 * whose root is labeled n in the recursion tree. The count includes
 * the initial call at its root. Thus, T(0) = 1.
 * It explicitly considers all the 2^(n - 1) possible ways of cutting up
 * a rod of length n.The tree of recursive calls has 2^(n - 1) leaves,
 * one for each possible way of cutting up the rod.
 * The recursive calls tree:
 *                          4
 *              3                         2           1       0
 *      2       1       0             1       0       0
 *   1    0     0
 *   0
 *
 * T(n) = 1 + (2^0 + 2^1 + 2^2 + ... + 2^(n - 1)) = 1 + (2^n - 1) = 2^n
 */

// ==================================================================
// Dynamic programming application
// ==================================================================

/**
 * Top-Down Approach with Memoization.
 * We write the procedure recursively in a natural manner,
 * but modified to save the result of each subproblem.
 * The procedure now first checks to see whether it has
 * previously solved this subproblem. If so,
 * it returns the saved value, saving further computation at this level;
 * if not, the procedure computes the value in the usual manner.
 * We say that the recursive procedure has been memoized;
 * it “remembers” what results it has computed previously.
 * @time- O(n^2)
 * @space- O(n)
 */
export function memoizedCutRod(
    length: number,
    priceTable: number[] = defaultRodPriceTable,
): number {
    return memoizedCutRodHelper(
        length,
        // length + 1 - because the array is used to store price
        // and we memorize prices for rod of length
        // 1 till "length" (not length - 1).
        createArrayAndFillWith<number>(length + 1, -Infinity),
        priceTable,
    );
}

/**
 * memoizedCutRod helper function.
 * @time- O(n^2)
 */
function memoizedCutRodHelper(
    length: number,
    memoizedSolutions: number[],
    priceTable: number[] = defaultRodPriceTable,
): number {
    let price;

    if (memoizedSolutions[length] >= 0) {
        // If the memoized solution exists, returns it.
        return memoizedSolutions[length];
    }

    if (length === 0) {
        // No rod, no money.
        price = 0;
    } else {
        price = -Infinity;

        // Divides the rod into two rods each time and
        // repeats the procedure for each of rods and so on.
        for (let i = 1; i <= length; i++) {
            price = Math.max(
                price,
                priceTable[i] +
                    memoizedCutRodHelper(
                        length - i,
                        memoizedSolutions,
                        priceTable,
                    ),
            );
        }
    }

    // Memorize the solution for the rod of length "length".
    memoizedSolutions[length] = price;

    return price;
}
/**
 * The amount of the overall loop sizes for a rod of length n, forms an
 * arithmetic progression.
 * 1 + 2 + 3 + ... + n = (n + 1) * n/2 = O(n^2)
 */

/**
 * Bottom-Up Approach with Memoization.
 * Basically it solves all the problems for the rod of length < "length",
 * and then use the result of previously solved sub-problems
 * to solve the problem.
 * @time- O(n^2)
 * @space- O(n)
 */
export function bottomUpCutRod(
    length: number,
    priceTable: number[] = defaultRodPriceTable,
): number {
    let price: number;
    const memoizedSolutions = createArrayAndFillWith<number>(length + 1, 0);

    // Each time takes a rod of length smaller than original length.
    for (let j = 1; j <= length; j++) {
        price = -Infinity;

        // Cuts that first rod into two rods in all possible combination.
        for (let i = 1; i <= j; i++) {
            price = Math.max(price, priceTable[i] + memoizedSolutions[j - i]);
        }

        // Memorizes the calculated max price.
        memoizedSolutions[j] = price;
    }

    return memoizedSolutions[length];
}
/**
 * The amount of the overall loop sizes for a rod of length n, forms an
 * arithmetic progression.
 * 1 + 2 + 3 + ... + n = (n + 1) * n/2 = O(n^2)
 */
