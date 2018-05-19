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
Suppose we have a worst-case running time as `an^2+bn+c`. The __rate of growth__, or __order of growth__, of the running time that really interests us. We therefore con- sider only the leading term of a formula (e.g., `an^2`), since the lower-order terms are relatively insignificant for large values of `n`. We also ignore the leading term’s constant coefficient, since constant factors are less significant than the rate of growth in determining computational efficiency for large inputs. For insertion sort, when we ignore the lower-order terms and the leading term’s constant coefficient, we are left with the factor of `n^2` from the leading term. We write that insertion sort has a worst-case running time of `O(n^2)` (pronounced “theta of `n`-squared”).

We usually consider one algorithm to be _more efficient_ than another if its worstcase running time has a lower order of growth. Due to constant factors and lower-order terms, an algorithm whose running time has a higher order of growth might take less time for small inputs than an algorithm whose running time has a lower-order of growth. But for large enough inputs, `O(n^2)` algorithm, for example, will run more quickly in the worst case than a `O(n^3)` algorithm.

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


