## Buble Sort

|  | Worst | Average | Best |
|:--|:-:|:-:|---|
| __Time Complexity__ | `O(n^2)` | `θ(n^2)` | `Ω(n)` |
| __Space Complexity__ | `O(1)` | `θ(1)` | `Ω(1)` |
| __Stable__ | Yes |
| __In Place__ | Yes |

__Bubble sort__, sometimes referred to as __sinking sort__, is a simple sorting algorithm that repeatedly steps through the list to be sorted, compares each pair of adjacent items and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.

Although the algorithm is simple, it is too slow and impractical for most problems even when compared to _insertion sort_.

Bubble sort can be practical if the input is in _mostly sorted_ order with some out-of-order elements nearly in position.

### Example:

![Bubble sort](./images/bubble-sort.gif)