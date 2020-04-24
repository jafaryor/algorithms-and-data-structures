## Quick Sort

|  | Worst | Average | Best |
|:--|:-:|:-:|---|
| __Time Complexity__ | `O(n^2)` | `θ(n logn)` | `Ω(n logn)` |
| __Space Complexity__ | `O(n)` | `θ(logn)` | `Ω(logn)` |
| __Stable__ | No |
| __In Place__ | Yes |

Quicksort is a comparison-based algorithm that uses divide-and-conquer to sort an array.

Here is the three-step divide-and-conquer process for sorting a typical subarray `A[p..r]`:
* __Divide:__ Partition `A[p..r]`, into two (possibly empty) subarrays `A[p..q−1]` and `A[q+1..r]`, such that each element in the first subarray `A[p..q−1]` is `≤ A[q]` and `A[q]` is `≤` each element in the second subarray `A[q+1..r]`.
* __Conquer:__ Sort the two subarrays `A[p..q-1]` and `A[q+1..r]` by recursive calls to quicksort.
* __Combine:__ Because the subarrays are already sorted, no work is needed to combine them: the entire array `A[p..r]` is now sorted.

> Most quicksort implementations are not stable, though stable implementations do exist.

### Complexity
* __Worst-case running time__

    The worst case happens when:
    1. Input sorted or reverse sorted
    2. Partition around min or max element.
    3. One side of partition always has no element.

    When quicksort always has the most unbalanced partitions possible (already sorted array), then the original call takes `cn` time for some constant `c`, the recursive call on `n-1` elements takes `c(n-1)` time, the recursive call on `n-2` elements takes `c(n-2)` time, and so on. Here's a tree of the subproblem sizes with their partitioning times:

    ![quick-sort-worst-case](./images/quick-sort-worst-case.png)

    When we total up the partitioning times for each level, we get:

    `cn + c(n−1) + c(n−2) + ⋯ + 2c = c(n + (n−1) + (n−2) + ⋯ + 2) = c((n+1)(n/2) − 1) = Θ(n^2)`

    The last line is because `1 + 2 + 3 + ⋯ + n` is the arithmetic series.

    > The Space Complexity is the height of the tree which is equal to `n` (size of the stack).

* __Best-case running time__

    Quicksort's best case occurs when the partitions are as evenly balanced as possible: their sizes either are equal or are within 1 of each other. The former case occurs if the subarray has an odd number of elements and the pivot is right in the middle after partitioning, and each partition has `(n-1)/2` elements.

    ![quick-sort-best-case](./images/quick-sort-best-case.png)

    Overall complexity: `Θ(n*log_2(n)) = Θ(n*lgn)`

    > The Space Complexity is the height of the tree which is equal to `log_2(n)` (size of the stack).

* __Average-case running time__

    Let's imagine that we don't always get evenly balanced partitions, but that we always get at worst a 3-to-1 split. That is, imagine that each time we partition, one side gets `3n/4` elements and the other side gets `n/4`. (To keep the math clean, let's not worry about the pivot.) Then the tree of subproblem sizes and partitioning times would look like this:

    ![quick-sort-average-case](./images/quick-sort-average-case.png)

    There are `log_4/3(n)` levels and each leves requires `cn` time. Overall time complexity: `Θ(n*log_4/3(n)) = Θ(n*lgn)`

    The other case we'll look at to understand why quicksort's average-case running time is `O(n*lgn)` is what would happen if the half of the time that we don't get a 3-to-1 split, we got the worst-case split. Let's suppose that the 3-to-1 and worst-case splits alternate, and think of a node in the tree with k kk elements in its subarray. Then we'd see a part of the tree that looks like this:

    ![quick-sort-second-average-case](./images/quick-sort-second-average-case.png)

    Therefore, even if we got the worst-case split half the time and a split that's 3-to-1 or better half the time, the running time would be about twice the running time of getting a 3-to-1 split every time. Again, that's just a constant factor, and it gets absorbed into the big-O notation.

    > The Space Complexity is the height of the tree which is equal to `log__4/3(n)` (size of the stack).

> __Optimal pivot is in the middle, because when you move it to the left or to the right (or take biggest or smallest item), you increase depth of recursion. In the worst case you will get O(n^2) except of O(n*log2(n)) when taking the middle.__

### Example
![quick-sort](./images/quick-sort.gif)

## Randomized Quick Sort
Approaches:
* In order to avoid worst case we can randomize the input before applying the QuickSort algorithm.
* Randomize choices made within the algorithm. We will select a randomly chosen element from the subarray `A[p..r]`. We do so by first exchanging `A[r]` with an element chosen at random from `A[p..r]`. __By randomly sampling the range `p,...,r`, we ensure that the pivot element `x = A[r]` is equally likely to be any of the `r - p + 1` elements in the subarray. Because we randomly choose the pivot element, we expect the split of the input array to be reasonably well balanced on average.__

The __Expected Worst Case__ time complexity of Randomized QuickSort is `O(2*n*lgn)`.

If, in each level of recursion, the split induced by `RANDOMIZED-PARTITION` puts any constant fraction of the elements on one side of the partition, then the recursion tree has depth `O(lg n)`, and `O(n)` work is performed at each level. Even if we add a few new levels with the most unbalanced split possible between these levels, the total time remains `(n*lg n)`.

> In terms of the number of comparisons it makes, _Randomized Quicksort_ is equivalent to randomly shuffling the input and then handing it off to _Naive Quicksort_.

The `QUICKSORT` and `RANDOMIZED-QUICKSORT` procedures differ only in how they select pivot elements. 

### Usage
Quicksort is sensitive to the data provided. Without usage of random pivots, it uses O(n^2) time for sorting a full sorted array. But by swapping random unsorted elements with the first element, and sorting afterwards, the algorithm becomes less sensitive to data would otherwise cause worst-case behavior (e.g. already sorted arrays).

> __Heapsort or Merge sort, it has a very low constant factor to its execution speed, which generally gives it a speed advantage when working with lots of random data.__

In practice:
* Quicksort is a great general-purpose sorting algorithm.
* Quicksort is typically over twice as fast as merge sort.
* Quicksort behaves well even with caching and virtual memory.

### Further Improvements
* switch to _insertion sort_ for tiny arrays.
* __Median-of-three partitioning__.

---

[Read More](https://www.codesdope.com/course/algorithms-quicksort/)
