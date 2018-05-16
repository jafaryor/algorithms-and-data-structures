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
