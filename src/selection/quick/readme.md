## QuickSelect

|  | Worst | Average | Best |
|:--|:-:|:-:|---|
| __Time Complexity__ | `O(n^2)` | `θ(n)` | `Ω(n)` |
| __Space Complexity__ | `O(n)` | `θ(n)` | `Ω(1)` |

In `QuickSort`, we recursively sort both branches, leading to best-case `O(n log n)` time. However, when doing selection, we already know which partition our desired element lies in, since the pivot is in its final sorted position, with all those preceding it in an unsorted order and all those following it in an unsorted order. Therefore, a single recursive call locates the desired element in the correct partition, and we build upon this for quickselect.

__Median of Medians__ is an approximate (median) selection algorithm, frequently used to supply a good pivot for an exact selection algorithm, mainly the quickselect, that selects the `k`th largest element.