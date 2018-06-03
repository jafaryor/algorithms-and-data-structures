# Sorting Algorithms
## Counting Sort
Counting sort is an integer sorting algorithm that assumes that each of the `n` input elements in a list has a key value ranging from `0` to `k`, for some integer `k`. For each element in the list, counting sort determines the number of elements that are less than it. Counting sort can use this information to place the element directly into the correct slot of the output array.

| Best-case | Worst-case | Average-case | Space Complexity | Stable? |
|:-:|:-:|:-:|:-:|:-:|
| `O(k + n)` | `O(k + n)` | `O(k + n)` | `O(k + n)` | Yes |

![counting-sort](./images/counting-sort.gif)

## Radix sort
| Best-case | Worst-case | Average-case | Space Complexity | Stable? |
|:-:|:-:|:-:|:-:|:-:|
| `O(d(k + n))` | `O(d(k + n))` | `O(d(k + n))` | `?` | ? |

## Bucket sort
| Best-case | Worst-case | Average-case | Space Complexity | Stable? |
|:-:|:-:|:-:|:-:|:-:|
| `O(n^2)` | `O(n^2)` | `O(n^2)` | `?` | Yes |

### Stability
A sorting algorithm is __stable__ if it preserves the original order of elements with equal key values