/**
 * Suppose we have a set `S = {a1, a2, ..., an}` of `n` proposed activities
 * that wish to use a resource, such as a lecture hall, which can serve
 * only one activity at a time. Each activity `a_i` has a start time `s_i`
 * and a finish time `f_i`, where `0 < s_i < f_i < ∞`.
 * If selected, activity `a_i` takes place during the half-open time
 * interval `[s_i, f_i)`. Activities `a_i` and `a_j` are compatible
 * if the intervals `[s_i, f_i) and `[s_j, f_j)`` do not overlap.
 * That is, `a_i` and `a_j` are compatible if `s_i ≥ f_i` or `s_j ≥ f_i`.
 * In the activity-selection problem, we wish to select a maximum-size
 * subset of mutually compatible activities. We assume that the activities
 * are sorted in monotonically increasing order of finish time:
 * f1 ≤ f2 ≤ ... ≤ fn
 *
 * Intuition suggests that we should choose an activity that leaves the
 * resource available for as many other activities as possible.
 * Now, of the activities we end up choosing, one of them must be
 * the first one to finish. Our intuition tells us, therefore,
 * to choose the activity in `S` with the earliest finish time,
 * since that would leave the resource available for as many of the
 * activities that follow it as possible. In other words,
 * since the activities are sorted in monotonically increasing order
 * by finish time, the "GREEDY CHOICE is activity `a1`.
 * Let `S_k = {a_i ∈ S: s_i ≥ f_k}` be the set of activities that
 * start after activity `a_k` finishes. If we make the greedy choice of
 * activity `a_1`, then `S_1` remains as the only subproblem to solve.
 * Optimal substructure tells us that if `a_1` is in the optimal solution,
 * then an optimal solution to the original problem consists of activity
 * `a_1` and all the activities in an optimal solution to the subproblem `S_1`.
 *
 * Of course the problem can be solved using Dynamic Programming.
 * Instead, we can repeatedly choose the activity that finishes first,
 * keep only the activities compatible with this activity,
 * and repeat until no activities remain.
 *
 * An algorithm to solve the activity-selection problem does not need to
 * work bottom-up, like a table-based dynamic-programming algorithm.
 * Instead, it can work top-down, choosing an activity to put into
 * the optimal solution and then solving the subproblem of choosing
 * activities from those that are compatible with those already chosen.
 * Greedy algorithms typically have this top-down design:
 * make a choice and then solve a subproblem, rather than the bottom-up
 * technique of solving sub-problems before making a choice.
 */

/**
 * iterative implementation.
 * @param activities - activity list, SORTED by finish times.
 * @time O(n)
 */
export function iterativeActivitySelector(activities: Activity[]): Activity[] {
    let k = 0; // the most addition to the "result" array.
    const n = activities.length;
    const result = [activities[0]];

    for (let m = 1; m < n; m++) {
        if (activities[m].start >= activities[k].end) {
            // The next compatible activity is found.
            result.push(activities[m]);
            k = m;
        }
    }

    return result;
}

/**
 * Recursive implementation.
 * @param activities - activity list, SORTED by finish times.
 * @time O(n) as each activity is examined exactly once in the loop.
 */
export function recursiveActivitySelector(activities: Activity[]): Activity[] {
    // Adds fictitious activity a_0 o start search from.
    return recursiveActivitySelectorHelper(
        [{start: 0, end: 0}, ...activities],
        0,
    );
}

/**
 * Recursive helper function.
 * @param activities - activity list, SORTED by finish times.
 * @param k - index that defines the subproblem S_k.
 * @time O(n) as each activity is examined exactly once in the loop.
 */
function recursiveActivitySelectorHelper(
    activities: Activity[],
    k: number,
): Activity[] {
    const n = activities.length;
    let m = k + 1;

    // Finds the first activity in S_k which finishes first.
    while (m < n && activities[m].start < activities[k].end) {
        m = m + 1;
    }

    if (m < n) {
        // The compatible activity is found.
        return [
            activities[m],
            ...recursiveActivitySelectorHelper(activities, m),
        ];
    } else {
        // No compatible activity is found.
        return [];
    }
}

/**
 * An activity which has start time and end time.
 */
export interface Activity {
    start: number;
    end: number;
}
