# Sorting Algorithms

## Merge Sort
Mergesort is a comparison-based algorithm that focuses on how to merge together two pre-sorted arrays such that the resulting array is also sorted.

| Best-case | Worst-case | Average-case | Space Complexity | Stable? |
|:-:|:-:|:-:|:-:|:-:|
| `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(n)` | Yes |

![merge-sort](./images/merge-sort.gif)

## Insertion Sort
Insertion sort is a comparison-based algorithm that builds a final sorted array one element at a time. It iterates through an input array and removes one element per iteration, finds the place the element belongs in the array, and then places it there.

| Best-case | Worst-case | Average-case | Space Complexity | Stable? |
|:-:|:-:|:-:|:-:|:-:|
| `O(n)` | `O(n*n)` | `O(n*n)` | `O(1)` | Yes |


![insertion-sort](./images/insertion-sort.gif)

## Bubble Sort
Bubble sort is a comparison​-based algorithm that compares each pair of elements in an array and swaps them if they are out of order until the entire array is sorted. For each element in the list, the algorithm compares every pair of elements.

| Best-case | Worst-case | Average-case | Space Complexity | Stable? |
|:-:|:-:|:-:|:-:|:-:|
| `O(n)` | `O(n*n)` | `O(n*n)` | `O(1)` | Yes |

![bubble-sort](./images/bubble-sort.gif)

## Quicksort
Quicksort is a comparison-based algorithm that uses divide-and-conquer to sort an array. The algorithm picks a pivot element, `A[q]`, and then rearranges the array into two subarrays `A[p...q-1]`, such that all elements are less than `A[q]`, and `A[q+1...r]`, such that all elements are greater than or equal to `A[q]`.

| Best-case | Worst-case | Average-case | Space Complexity | Stable? |
|:-:|:-:|:-:|:-:|:-:|
| `O(n log n)` | `O(n*n)` | `O(n log n)` | `log n` - best, `n` - avg | Usually not* |

> *Most quicksort implementations are not stable, though stable implementations do exist.

![quick-sort](./images/quick-sort.gif)

## Heapsort
Heapsort is a comparison-based algorithm that uses a binary heap data structure to sort elements. It divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region.

| Best-case | Worst-case | Average-case | Space Complexity | Stable? |
|:-:|:-:|:-:|:-:|:-:|
| `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(1)` | No |

![heap-sort](./images/heap-sort.gif)

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