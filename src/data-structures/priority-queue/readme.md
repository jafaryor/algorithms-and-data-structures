## Priority Queue
Priority Queue is an abstract data type which is like a regular queue or stack data structure, but where additionally each element has a _"priority"_ associated with it

In a priority queue, an element with high priority is served before an element with low priority. If two elements have the same priority, they are served according to their order in the queue.

While priority queues are often implemented with heaps, they are conceptually distinct from heaps. A priority queue is an abstract concept like "list" or "map"; just as a list can be implemented with a linked list or an array, a priority queue can be implemented with a heap or a variety of other methods such as an unordered array.

Order of grows of worst-case running time for Priority Queue implementations:

| Data Structure | Insert | Remove Max/Min |
| --- | --- | --- |
| Ordered Array | `N` | `1` |
| Unordered Array | `1` | `N` |
| Heap | `logN` | `logN` |

There are two types of Priority Queues: _Min Priority Queue_ and _Max Priority Queue_. Thus, a max-priority queue returns the element with the maximum key first whereas, a min-priority queue returns the element with the smallest key first.

### Priority Queue vs Heap
A priority queue is an abstract data type. We do not specify the implementation when it is abstract. You could implement a PriorityQueue with an unsorted array if you wanted to. Would it be the most efficient way to implement it? No, but it would still be a priority queue. It just so happens that a heap is a very good data structure to implement a priority queue

A binary heap is not an abstract data type; it is an actual implementation of a data structure.

### Applications
* Bandwidth management

    Priority queuing can be used to manage limited resources such as bandwidth on a transmission line from a network router. In the event of outgoing traffic queuing due to insufficient bandwidth, all other queues can be halted to send the traffic from the highest priority queue upon arrival.

* Dijkstra's algorithm

    Priority queue can be used to extract minimum efficiently when implementing Dijkstra's algorithm, although one also needs the ability to alter the priority of a particular vertex in the priority queue efficiently.

* Best-first search algorithms

    Best-first search algorithms, find the shortest path between two vertices or nodes of a weighted graph, trying out the most promising routes first. A priority queue is used to keep track of unexplored routes; the one for which the estimate of the total path length is smallest is given highest priority.

* Prim's algorithm for minimum spanning tree

    Using Min Heap Priority queue in Prim's algorithm to find the minimum spanning tree of a connected and undirected graph, one can achieve a good running time.

---

#### [Read More](https://www.codesdope.com/course/data-structures-priority-queues/)

### [Watch](https://www.youtube.com/watch?v=wptevk0bshY)
