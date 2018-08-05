## Shell Sort

|  | Worst | Average | Best |
|:--|:-:|:-:|---|
| __Time Complexity__ | `O(n^2)` | `θ(n^(3/2))` | `Ω(n * log n)` |
| __Space Complexity__ | `O(1)` | `θ(1)` | `Ω(1)` |

_Shell's Sort_, is an in-place comparison sort. It can be seen as either a generalization of sorting by exchange (bubble sort) or sorting by insertion (insertion sort). The method starts by sorting pairs of elements far apart from each other, then progressively reducing the gap between elements to be compared. Starting with far apart elements, it can move some out-of-place elements into position faster than a simple nearest neighbor exchange.

> __The running time of Shellsort is heavily dependent on the gap sequence it uses.__ For many practical variants, determining their time complexity remains an open problem.

The beast case happens when the array is nerly sorted.

> __Shell Sort is not stable__

### Example
[Youtube Video](https://www.youtube.com/watch?v=CmPA7zE8mx0)