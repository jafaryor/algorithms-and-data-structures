# Sorting Algorithms
Sorting algorithm is an algorithm that puts elements of a list in a certain order.

An __inversion__ is a pair of entries that are out of order in the array. For instance, `E X A M P L E` has 11 inversions: `E-A`, `X-A`, `X-M`, `X-P`, `X-L`, `X-E`, `M-L`, `M-E`, `P-L`, `P-E`, and `L-E`.

If the number of inversions in an array is less than a constant multiple of the array size, we say that the array is __partially sorted__. Typical examples of partially sorted arrays are the following:
* An array where each entry is not far from its final position.
* A small array appended to a large sorted array.
* An array with only a few entries that are not in place.

Sorting algorithms are often classified by:
* __Computational complexity__ (worst, average and best behavior) in terms of the size of the list (`n`). Comparison-based sorting algorithms need at least `Ω(n log n)` comparisons for most inputs.
* __Computational complexity__ of swaps (for "in-place" algorithms).
* __Memory usage__ (and use of other computer resources). In particular, some sorting algorithms are "in-place". Strictly, an in-place sort needs only `O(1)` memory beyond the items being sorted; sometimes `O(log(n))` additional memory is considered "in-place".
* __Recursion__. Some algorithms are either recursive or non-recursive, while others may be both (e.g., merge sort).
* __Stability__. Stable sorting algorithms maintain the relative order of records with equal keys (i.e., values).
* Whether or not they are a __comparison sort__. A comparison sort examines the data only by comparing two elements with a comparison operator.
* __General method__: insertion, exchange, selection, merging, etc. Exchange sorts include bubble sort and quicksort. Selection sorts include shaker sort and heapsort.
* Whether the algorithm is __serial__ or __parallel__.
* __Adaptability__: Whether or not the presortedness of the input affects the running time. Algorithms that take this into account are known to be adaptive.

## Decision Tree
In a comparison sort, we use only comparisons between elements to gain order information about an input sequence.

We can view comparison sorts abstractly in terms of decision trees. A __decision tree__ is a full binary tree that represents the comparisons between elements that are performed by a particular sorting algorithm operating on an input of a given size.

> In short __decision tree__ is a abstraction of any comparison sort.

Control, data movement, and all other aspects of the algorithm are ignored. Each internal node indicates a comparison `a[i] ≤ a[j]`. When we come to a leaf, the sorting algorithm has established the ordering.

> The __execution__ of the sorting algorithm corresponds to tracing a simple path from the root of the decision tree down to a leaf.

> __Worst-case__ number of comparisons for a given comparison sort algorithm equals the height of its decision tree.

![sorting-decision-tree](./images/sorting-decision-tree.png)

### Lemma: Any binary tree of height `h` has `≤ 2`<sup>`h`</sup> leaves.

### Theorem: No compare-based sorting algorithm can guarantee to sort `N` items with fewer than `lg(N!) ~ N lgN` compares.

Proof:
The first key observation in the proof is that the decision tree must have at least `N!` leaves because  there  are `N!` different permutations of `N` distinct keys. If there are fewer than `N!`  leaves,  then  some  permutation  is  missing  from  the  leaves,  and  the  algorithm would fail for that permutation.

The number of internal nodes on a path from the root to a leaf in the tree is the number of compares used by the algorithm for some input. We are interested in the length of the longest such path in the tree (known as the tree height) since it measures the worst-case number of compares used by the algorithm. According to above lemma, a binary tree of height `h` has no more than `2`<sup>`h`</sup> leaves.

Combining the previous two observations, we have shown that any compare-based sorting algorithm corresponds to a compare tree of height `h` with:

`N! ≤ number of leaves ≤ 2`<sup>`h`</sup>

The value of `h` is precisely the worst-case number of compares, so we can take the logarithm (base 2) of both sides of this equation and conclude that the number of compares used by any algorithm must be at least `lg(N!)`

![comparison-sort-theorem-proof](./images/comparison-sort-theorem.png)

### Corollary: _HeapSort_ and _MergeSort_ are asymptotically optimal comparison sorts.

### Corollary: Quicksort is the fastest general-purpose sort.

The reason  that  quicksort  is  fastest  is  that  it  has  only  a  few  instructions  in  its  inner loop (and it does well with  cache memories because it most often references data sequentially) so that its running time is `~ c N lgN` with the value of `c` smaller than the corresponding constants for other linearithmic sorts. With 3-way partitioning, quicksort  becomes  linear  for  certain  key  distributions  likely  to  arise  in  practice, where other sorts are linearithmic.

You certainly should seriously consider using quicksort in any sort application where running time is important. 

__[More about Sorting Algorithms](https://en.wikipedia.org/wiki/Sorting_algorithm)__