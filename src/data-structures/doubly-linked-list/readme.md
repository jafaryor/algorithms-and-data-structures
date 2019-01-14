## Doubly-Linked List

Sentinels rarely reduce the asymptotic time bounds of data structure operations, but they can reduce constant factors. The gain from using sentinels within loops is usually a matter of clarity of code rather than speed; the linked list code, for example, becomes simpler when we use sentinels, but we save only `O(1)` time in the __LIST-INSERT__ and __LIST-DELETE__ procedures.