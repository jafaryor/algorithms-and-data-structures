# Least Recently Used (LRU) Cache
A Least Recently Used (LRU) Cache organizes items in order of use, allowing you to quickly identify which item hasn't been used for the longest amount of time.

#### Strengths:
* Super fast accesses. LRU caches store items in order from most-recently used to least-recently used. That means both can be accessed in `O(1)` time.
* Super fast updates. Each time an item is accessed, updating the cache takes `O(1)` time.

#### Weaknesses:
* Space heavy. An LRU cache tracking nn items requires a linked list of length nn, and a hash map holding nn items. That's O(n)O(n) space, but it's still two data structures (as opposed to one).

