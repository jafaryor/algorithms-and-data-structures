## Quick Sort

|  | Worst | Average | Best |
|:--|:-:|:-:|---|
| __Time Complexity__ | `O(n^2)` | `θ(n logn)` | `Ω(n logn)` |
| __Space Complexity__ | `O(n)` | `θ(n)` | `Ω(logn)` |

Quicksort is a comparison-based algorithm that uses divide-and-conquer to sort an array.

Here is the three-step divide-and-conquer process for sorting a typical subarray `A[p..r]`:
* __Divide:__ Partition (rearrange) the array `A[p..r]` into two (possibly empty) subarrays `A[p..q-1]` and `A[q+1..r]` such that each element of `A[p..q-1]` is less than or equal to `A[q]`, which is, in turn, less than or equal to each element of `A[q+1..r]`. Compute the index `q` as part of this partitioning procedure.
* __Conquer:__ Sort the two subarrays `A[p..q-1]` and `A[q+1..r]` by recursive calls to quicksort.
* __Combine:__ Because the subarrays are already sorted, no work is needed to combine them: the entire array `A[p..r]` is now sorted.

> Most quicksort implementations are not stable, though stable implementations do exist.

### Example
![quick-sort](./images/quick-sort.gif)