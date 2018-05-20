## Analyzing algorithms
__Algorithm__ - is any well-defined computational procedure that takes some value, or set of values, as _input_ and produces some value, or set of values, as _output_. An algorithm is thus a sequence of computational steps that transform the input into the output.

### Input Size
The best notion for __input size__ depends on the problem being studied.

For many problems, such as sorting or computing discrete Fourier transforms, the most natural measure is the _number of items_ in the input—for example, the array size `n` for sorting.

For many other problems, such as multiplying two integers, the best measure of input size is the total number of bits needed to represent the input in ordinary binary notation.

Sometimes, it is more appropriate to describe the size of the input with two numbers rather than one. For instance, if the input to an algorithm is a graph, the input size can be described by the numbers of vertices and edges in the graph.

> We shall indicate which input size measure is being used with each problem we study.

### Running Time
The __running time__ of an algorithm on a particular input is the number of primitive operations or _“steps”_ executed.

It is convenient to define the notion of step so that it is as machine-independent as possible. For the moment, let us adopt the following view.

A constant amount of time is required to execute each line of our pseudocode. One line may take a different amount of time than another line, but we shall assume that each execution of the ith line takes time `c[i]`, where `c[i]` is a constant.

This viewpoint is in keeping with the RAM model, and it also reflects how the pseudocode would be implemented on most actual computers.

### Order of growth
Look only at the leading term of the formula for running time.
* Drop lower-order terms.
* Ignore the constant coefficient in the leading term.

Example: For _insertion sort_ we already abstracted away the actual statement costs to conclude that the worst-case running time is `an^2 + bn + c`.
* Drop lower-order terms ⇒ `an^2`.
* Ignore constant coefficient ⇒ `n^2`.

But we cannot say that the worst-case running time `T(n)` equals `n^2`. It grows like `n^2`. But it doesnít equal `n^2`.

We say that the running time is `O(n^2)` to capture the notion that the _order of growth_ is `n^2`.

We usually consider one algorithm to be _more efficient_ than another if its worst-case running time has a smaller order of growth.

## Designing Algorithms
### Incremental Approach
We can choose from a wide range of algorithm design techniques. An __incremental approach__: having sorted the subarray `A[1..j-1]` , we inserted the single element `A[j]` into its proper place, yielding the sorted subarray `A[1..j]`.

> For _insertion sort_, we used an _incremental approach_

### The Divide-and-Conquer Approach
The divide-and-conquer paradigm involves three steps at each level of the recursion:
* __Divide__ the problem into a number of subproblems that are smaller instances of the same problem.
* __Conquer__ the subproblems by solving them recursively. If the subproblem sizes are small enough, however, just solve the subproblems in a straightforward manner.
* __Combine__ these solutions to create a solution to the original problem.

> The _merge sort_ algorithm closely follows the _divide-and-conquer paradigm_

When an algorithm contains a recursive call to itself, we can often describe its running time by a __recurrence equation__ or __recurrence__, which describes the overall running time

A recurrence for the running time of a _divide-and-conquer algorithm_ falls out from the three steps of the basic paradigm. As before, we let `T(n)` be the running time on a problem of size `n`. If the problem size is small enough, say `n <= c` for some constant `c`, the straightforward solution takes constant time, which we write as `O(1)`. Suppose that our division of the problem yields `a` subproblems, each of which is `1/b` the size of the original. (For merge sort, both `a` and `b` are `2`, but we shall see many divide-and-conquer algorithms in which `a != b`) It takes time `T(n/b)` to solve one subproblem of size `n/b`, and so it takes time `aT(n/b)` to solve `a` of them. If we take `D(n)` time to divide the problem into subproblems and `C(n)` time to combine the solutions to the subproblems into the solution to the original problem, we get the recurrence.

![divide-and-conquer-recurrence](./images/divide-and-conquer-recurrence.png)

## Growth of Functions
#### Asymptotic notation
Asymptotic notation is a way to describe behavior of functions in the limit, describe growth of functions.

It is about focusing on whatís important by abstracting away low-order terms and constant factors.

Because `θ(g(n))` is a set, we could write `f(n) ∈ θ(g(n))` to indicate that f.n/ is a member of `θ(g(n))`. Instead, we will usually write `f(n) = θ(g(n))` to express the same notion.

A way to compare sizes of functions:
* __`θ` ≈ `=`__

    `θ(g(n))` = `{` `f(n)`: there exist positive constants `c1`, `c2`, and `n0` such that: `0 ≤ c1g(n) ≤ f(n) ≤ c2g(n)` for all `n ≥ n0` `}`

    > We say that `g(n)` is an asymptotically tight bound for `f(n)`.

    The definition of `θ(g(n))` requires that every member `f(n) ∈ θ(g(n))` be asymptotically _nonnegative_, that is, that `f(n)` be nonnegative whenever `n` is sufficiently large.

    Consequently, the function `g(n)` itself must be asymptotically nonnegative, or else the set `θ(g(n))` is empty.

    Previously we introduced an informal notion of `θ`-notation that amounted to throwing away lower-order terms and ignoring the leading coefficient of the highest-order term. Let us briefly justify this intuition by using the formal definition to show that `n^2/2 - 3n = θ(n2)`. To do so, we must determine positive constants `c1`, `c2`, and `n0` such that:

    `c1 * n^2 ≤ n^2/2 - 3n ≤ c2 * n^2`

    for all `n ≥ n0`. Dividing by `n^2` yields:

    `c1 ≤ 1/2 - 3/n ≤ c2`

    We can pick constants. For example: `c2 = 1/4`, `c1 < 1/4`, `n0 = 7`.

    > Intuitively, the lower-order terms of an asymptotically positive function can be ignored in determining asymptotically tight bounds because they are insignificant for large `n`. When `n` is large, even a tiny fraction of the highest-order term suffices (хватает) to dominate the lower-order terms. Thus, setting `c1` to a value that is slightly smaller than the coefficient of the highest-order term and setting `c2` to a value that is slightly larger permits the inequalities in the definition of `θ`-notation to be satisfied.

    > The coefficient of the highest-order term can likewise be ignored, since it only changes `c1` and `c2` by a constant factor equal to the coefficient.

* __`O` ≈ `≥`__

    The `θ`-notation asymptotically bounds a function from above and below. When we have only an __asymptotic upper bound__, we use `O`-notation.

    `O(g(n))` = `{` `f(n)`: there exist positive constants `c`, and `n0` such that: `0 ≤ f(n) ≤ cg(n)` for all `n ≥ n0` `}`

    `θ(g(n)) ⊆ O(g(n))` - `θ(g(n))` is a subset of `O(g(n))`

* __`Ω` ≈ `≤`__

    `Ω`-notation provides an __asymptotic lower bound__.

    `Ω(g(n))` = `{` `f(n)`: there exist positive constants `c`, and `n0` such that: `0 ≤ cg(n) ≤ f(n)` for all `n ≥ n0` `}`

* __`o` ≈ `>`__

    We use `o`-notation to denote an _upper bound_ that is _not asymp- totically tight_.

    `o(g(n))` = `{` `f(n)`: for any positive constants `c > 0`, ther exists a constant `n0 > 0` such that: `0 ≤ f(n) < cg(n)` for all `n ≥ n0` `}`

    Example: `n^1.9999 = o(n2)`

    In `o`-notation, `f(n)` becomes insignificant (незначительный) relative to `g(n)` as `n` approaches infinity:

    ![o-notation](./images/o-notaion.png)

* __`ω` ≈ `<`__

    We use `ω`-notation to denote a _lower_ bound that is _not asymptotically tight_.

    `ω(g(n))` = `{` `f(n)`: for any positive constants `c > 0`, ther exists a constant `n0 > 0` such that: `0 ≤ cg(n) < f(n)` for all `n ≥ n0` `}`

    Example: `n^2 / 2 = ω(n)`

    in `ω`-notation, `f(n)` becomes arbitrarily large relative to `g(n)` as `n` approaches infinity.

    ![ω-notation](./images/w-notaion.png)

The running time of insertion sort therefore belongs to both `Ω(n)` and `O(n^2)`.

![asymptotic netations](./images/asymptotic-notations.png)

> __Theorem__: `f(n) = θ(g(n))` if and only if `f(n) = O(g(n))` and `f(n) = Ω(g(n))`.

### Asymptotic notation in equations and inequalities
When asymptotic notation appears in a formula (`2n^2 + 3n + 1 = 2n^2 + θ(n)`), we interpret it as standing for some anonymous function that we do not care to name.

In case: `2n^2 + θ(n) = θ(n^2)`, the right-hand side of an equation provides a coarser (грубее) level of detail than the left-hand side.

### Comparing functions
Assume that `f(n)` and `g(n)` are asymptotically positive.




