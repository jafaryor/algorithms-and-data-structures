import {Matrix} from '../data-structures';

/**
 * The simplex algorithm for solving linear program in standard form.
 * @param A - matrix representation of constraints.
 * @param b - constant vector, which gives upper bound for constraints.
 * @param c - vector of coefficient of nonbasic variables in objective function.
 * @returns an n-vector x that is an optimal solution to the linear program.
 * @complexity O(C(n + m, m))
 */
export function simplex(A: number[][], b: number[], c: number[]) {
    let slack = toSlackForm(A, b, c)!;
    const n = slack.N.length;
    const x = new Array(n);
    const delta = new Array(n);
    let e: number;
    let l: number;

    // While all coefficients in the objective function are positive.
    while (pickEnteringVariable(slack.N, slack.c) != null) {
        e = pickEnteringVariable(slack.N, slack.c)!;

        // Check each constraint and pick the one that most severely
        // limits the amount by which we can increase x_e without
        // violating any of the non-negativity constraints.
        for (const i of slack.B) {
            if (slack.A[i][e] > 0) {
                delta[i] = slack.b[i] / slack.A[i][e];
            } else {
                delta[i] = Infinity;
            }
        }

        l = pickLeavingVariable(slack.B, delta);

        if (delta[l]) {
            throw new Error('Unbounded Linear Program!');
        } else {
            slack = simplexPivot(
                slack.N,
                slack.B,
                slack.A,
                slack.b,
                slack.c,
                slack.v,
                l,
                e,
            );
        }
    }

    // Computes the optimal solution.
    for (let i = 0; i < n; i++) {
        // Set nonbasic variables to 0 and each basic variable to b[i].
        x[i] = slack.B.includes(i) ? slack.b[i] : 0;
    }

    return x;
}

/**
 * The function which performs pivoting on slack form.
 * @param N - set of indices of the nonbasic variables.
 * @param B - set of indices of the basic variables.
 * @param A - matrix representation of constraints.
 * @param b - constant vector, which gives upper bound for constraints.
 * @param c - vector of coefficient of nonbasic variables in objective function.
 * @param v - optional constant term in the objective function.
 * @param l - index of leaving variable x_l.
 * @param e - index of entering variable x_e.
 * @returns the next/new slack form.
 * @note The function always calls with A[l][e] ≠ 0, to avoid division by 0.
 */
function simplexPivot(
    N: number[],
    B: number[],
    A: number[][],
    b: number[],
    c: number[],
    v: number,
    l: number,
    e: number,
): {
    N: number[];
    B: number[];
    A: number[][];
    b: number[];
    c: number[];
    v: number;
} {
    const n = N.length;
    const m = B.length;
    // The next/new slack form.
    const next = {
        N: [...N],
        B: [...B],
        A: Matrix.createEmptyMatrixOfSize(m, n),
        b: new Array(m),
        c: new Array(n),
        v: 0,
    };

    // Compute the coefficients in the new equation for x_e
    // by rewriting the equation that has x_l on the left-hand side
    // to instead have x_e on the left-hand side.
    next.b[e] = b[l] / A[l][e];

    for (const j of N) {
        if (j === e) continue;

        next.A[e][j] = A[l][j] / A[l][e];
    }

    next.A[e][l] = 1 / A[l][e];

    // Update the remaining equations by substituting the
    // right-hand side of this new equation for each occurrence of x_e.
    for (const i of B) {
        if (i === l) continue;

        next.b[i] = b[i] - A[i][e] * next.b[e];

        for (const j of N) {
            if (j === e) continue;

            next.A[i][j] = A[i][j] - A[i][e] * next.A[e][j];
        }

        next.A[i][l] = -A[i][e] * next.A[e][l];
    }

    // Compute the objective function by doing
    // the same substitution for the objective function.
    next.v = v + c[e] * next.b[e];

    for (const j of N) {
        if (j === e) continue;

        next.c[j] = c[j] - c[e] * next.A[e][j];
    }

    next.c[l] = -c[e] * next.A[e][l];

    // Update the sets of nonbasic and basic variable by:
    // 1. removing e from N and adding l
    // 2. removing l from B and adding e
    const eIndex = N.findIndex((x) => x === e);
    const lIndex = B.findIndex((x) => x === l);

    next.N[eIndex] = l;
    next.B[lIndex] = e;

    // Return the newly computed slack tuple.
    return next;
}

/**
 * Returns a slack form for which the basic solution is feasible.
 * @param A - matrix representation of constraints.
 * @param b - constant vector, which gives upper bound for constraints.
 * @param c - vector of coefficient of nonbasic variables in objective function.
 * @note received the linear program in standard form.
 */
function toSlackForm(
    A: number[][],
    b: number[],
    c: number[],
):
    | {
          N: number[];
          B: number[];
          A: number[][];
          b: number[];
          c: number[];
          v: number;
      }
    | undefined {
    // TODO: Implement it.

    /**
     * let `k` be the index of the minimum `b_i`;
     *
     * // Checks if the initial basic solution is feasible.
     * if (b_k ≥ 0) {
     *      return ({1, 2, ..., n}, {n+1, n+2, ..., n+m}, A, b, c, 0);
     * }
     *
     * form `L_aux` by adding `-x_0` to the left-hand side of each constraint
     *      and setting the objective function to `-x_0`;
     *
     * let (N, B, A, b, c, v) be the resulting slack form for `L_aux`;
     *
     * l = n + k;
     *
     * // `L_aux` has n+1 nonbasic variables and `m` basic variables.
     * (N, B, A, b, c, v) = simplexPivot(N, B, A, b, c, v, l, 0);
     *
     * // The basic solution is now feasible for `L_aux`.
     * iterate the `while` loop of `simplex()` until an optimal solution
     *      to `L_zux` is found;
     *
     * if the optimal solution to `L_aux` sets `x_0` to 0 {
     *      if (`x_0` is basic) {
     *          perform one (degenerate) pivot to make it nonbasic;
     *      }
     *
     *      form the final slack form of `L_aux`, remove `x_0` from
     *      the constraints and restore the original objective function
     *      of L, but replace each basic variable in this objective
     *      function by the right-hand side of its associated constraint;
     *
     *      return the modified final slack form;
     * }
     * else return 'Infeasible!';
     */

    return;
}

/**
 * Bland’s rule.
 * Picks an entering variable from nonbasic variable,
 * whose coefficient in the objective function is positive.
 * @param N - set of indices of the nonbasic variables.
 * @param c - vector of coefficient of nonbasic variables in objective function.
 */
function pickEnteringVariable(N: number[], c: number[]): number | undefined {
    for (const j of N) {
        if (c[j] > 0) return j;
    }

    return;
}

/**
 * Bland’s rule.
 * Picks the leaving variable from basic variables,
 * whose delta is minimum.
 * @param B - set of indices of the basic variables.
 * @param delta - constant factor / coefficient of entering variable.
 */
function pickLeavingVariable(B: number[], delta: number[]): number {
    const minDelta = Math.min(...delta);
    const minIndex = delta.findIndex((x) => x === minDelta);

    return B[minIndex];
}
