# Sorting Algorithms
## Quicksort
Quicksort is a comparison-based algorithm that uses divide-and-conquer to sort an array. The algorithm picks a pivot element, `A[q]`, and then rearranges the array into two subarrays `A[p...q-1]`, such that all elements are less than `A[q]`, and `A[q+1...r]`, such that all elements are greater than or equal to `A[q]`.

| Best-case | Worst-case | Average-case | Space Complexity | Stable? |
|:-:|:-:|:-:|:-:|:-:|
| `O(n log n)` | `O(n*n)` | `O(n log n)` | `log n` - best, `n` - avg | Usually not* |

> *Most quicksort implementations are not stable, though stable implementations do exist.

![quick-sort](./images/quick-sort.gif)

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