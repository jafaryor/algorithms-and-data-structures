## Open Addressing
Open Addressing is an alternative to chaining for handling collisions. In Open Addressing, all elements are stored in the hash table itself. _So at any point, size of table must be greater than or equal to total number of keys._

> We can increase table size by copying old data if needed.

> Examining a slot is known as a __probe__.

Operations:
* `insert(k)` - keep probing until an empty or dummy slot is found. Once found, insert `k`.
* `search(k)` - keep probing until slot's key doesn't become equal to `k` or an empty slot is reached.
* `delete(k)` - Delete operation is inserting. If we simply delete a key, then search may fail. So slots of deleted keys are marked specially as 'deleted'. To mark a node deleted, we have used __dummy node__ with key `-1`.

The advantage of open addressing is that it _avoids pointers altogether_. Instead of following pointers, we compute the sequence of slots to be examined. The extra memory freed by not storing pointers provides the hash table with a larger number of slots for the same amount of memory, potentially yielding fewer collisions and faster retrieval.

With open addressing, we require that for every key `k`, the __probe sequence__ `⟨h(k, 0), h(k, 1), ..., h(k, m-1)⟩` be a permutation of `⟨0, 1, ..., m-1⟩` - __uniform hashing__.

### Probing
The ideal situation is __uniform hashing__. It's hard to implement true uniform hashing, so we approximate it with techniques that at least guarantee that the probe sequence is a permutation of `⟨0, 1, ..., m−1⟩`.

* __Linear probing__: Given auxiliary hash function `h′`, the probe sequence starts at slot `h′(k)` and continues sequentially through the table. Given key `k` and probe number `i` (`0 ≤ i < m`):

    `h(k,i) = (h′(k) + i) mod m`

    Linearly probe for next slot. Then when the end is reached, start from very first slot.

    __Advantage:__ Easy to implement.

    __Disadvantage:__ __Primary Clustering__ will happen since most of the values will be stored in the same part of the table since the position is only incremented by 1. Clustering is the tendency to store most values in adjacent locations near the hash position rather than distributing values equally across all open table locations. This problem will cause performance issues as the cluster grows larger.

* __Quadratic probing__: Unlike linear probing, it jumps around in the table according to a quadratic function of the probe number:

    `h(k,i) = (h′(k) + c1*i+c2*i^2) mod m`, where `c1, c2 ≠ 0` are constants and `h′` is an auxiliary hash function.

    Look for `i^2`‘th slot in `i`’th iteration.

    __Disadvantage:__ Leads to a milder form of clustering, called __secondary clustering__.

* __Double Hashing__: Offers one of the best methods available for open addressing because the permutations produced have many of the characteristics of randomly chosen permutations. Use two auxiliary hash functions, `h1` and `h2`. `h1` gives the initial probe, and `h2` gives the remaining probes:

    `h(k,i) = (h1(k) + i*h2(k)) mod m.`

    The `h2(k)` must be relatively prime to `m` (no factors in common other than `1`) in order to guarantee that the probe sequence is a full permutation of `⟨0, 1, ..., m−1⟩`.

    A convenient way to ensure this condition is to let `m` be a power of `2` and to design `h2` so that it always produces an _odd number_.

    Another way is to let `m` be prime and to design `h2` so that it always returns a positive integer less than `m`. For example, we could choose `m` prime and let

    `h1(k) = k mod m`;

    `h2(k) = 1 + (k mod m′)`;

    where `m′` is chosen to be slightly less than `m` (say, `m - 1`).

    When `m` is prime or a power of 2, double hashing improves over linear or quadratic probing, since each possible `(h1(k), h2(k))` pair yields a distinct probe sequence. As a result, for such values of m, the performance of double hashing appears to be very close to the performance of the “ideal” scheme of uniform hashing.

__Theorem:__ Given an open-address hash table with load factor `α = n/m < 1`, the expected number of probes in an unsuccessful search is at most `1 / (1 - α)`, assuming _uniform hashing_.


__Corollary:__ Inserting an element into an open-address hash table with load factor `α`, ̨requires at most `1 / (1 - α)` probes on average, assuming _uniform hashing_.


__Theorem:__ Given an open-address hash table with load factor `α < 1`, the expected number of probes in a successful search is at most `1/α * ln(1/(1-α))` assuming _uniform hashing_ and assuming that each key in the table is equally likely to be searched for.


_Difference:_

| Separate Chaining	| Open Addressing |
| - | - |
| Chaining is simpler to implement.	| Open Addressing requires more computation. |
| In chaining, Hash table never fills up, we can always add more elements to chain. | In open addressing, table may become full. |
| Chaining is less sensitive to the hash function or load factors. | Open addressing requires extra care to avoid clustering and load factor. |
| Chaining is mostly used when it is unknown how many and how frequently keys may be inserted or deleted. | Open addressing is used when the frequency and number of keys is known. |
| Cache performance of chaining is not good as keys are stored using linked list. | Open addressing provides better cache performance as everything is stored in the same table. |
| Wastage of Space (Some Parts of hash table in chaining are never used). | In Open addressing, a slot can be used even if an input doesn’t map to it. |
| Chaining uses extra space for links. | No links in Open addressing. |

[Read more](http://courses.csail.mit.edu/6.006/fall11/lectures/lecture10.pdf)
