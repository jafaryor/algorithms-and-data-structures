# Graph

## Graph representations
### Adjacency-list Representation
We  can  choose  between  two  standard  ways  to  represent  a  graph `G = (V, E)`: as a collection  of adjacency  lists or as an adjacency  matrix.  Either way applies to both directed and undirected graphs.

![graph-representations](./images/graph-representations.png)

The __adjacency-list representation__ of  a  graph `G = (V, E)` consists  of  an  array `Adj` of `|V|` lists, one for each vertex in `V`.  For each `u ∈ V`, the adjacency list `Adj[u]` contains all the vertices such that there is an edge `(u, v) ∈ E`. That is, `Adj[u]` consists of all the vertices adjacent to `u` in `G`.

If `G` is a directed graph, the sum of the lengths of all the adjacency lists is `|E|`, since an edge of the form `(u, v)` is represented by having `v` appear in `Adj[u]`. If `G` is an undirected graph, the sum of the lengths of all the adjacency lists is `2|E|`, since if `(u, v)` is an undirected edge, then `u` appears in `v`’s adjacency list and vice versa. For both directed and undirected graphs, the adjacency-list representation has the desirable property that the amount of memory it requires is `θ(V + E)`.

We can readily adapt adjacency lists to represent __weighted graphs__, that is, graphs for which each edge has an associated __weight__, typically given by a __weight function__ `w: E -> R`. For example, let `G = (V, E)` be a weighted  graph  with weight function `w`.   We  simply  store  the  weight `w(u ,v)` of  the  edge `(u, v) ∈ E` with vertex `v` in `u`’s adjacency list.

A potential disadvantage of the adjacency-list representation is that it provides no quicker way to determine whether a given edge `(u, v)` is present in the graph than to search for `v` in the adjacency list `Adj[u]`.  An adjacency-matrix representation of the graph remedies this disadvantage, but at the cost of using asymptotically more memory.

### Adjacency-matrix Representation
For the adjacency-matrix representation of a graph `G = (V, E)`, we assume that the vertices are numbered `1, 2, ..., |V|` in some arbitrary manner.  Then the adjacency-matrix  representation  of  a  graph `G` consists  of  `|V| x |V|` matrix `A = (a[i, j])` such that: `a[i, j] = {1, if (i, j) ∈ E, 0 otherwise}`

The adjacency matrix of a graph requires‚ `θ(V^2)` memory, independent of the number of edges in the graph.

Observe the symmetry along the main diagonal of the adjacency matrix.   Since in  an undirected  graph, `(u, v)` and `(v, u)` represent  the  same edge, the adjacency matrix `A` of an undirected graph is its own transpose: `A = A^T`. In some applications, it pays to store only the entries on and above the diagonal of the adjacency matrix, thereby cutting the memory needed to store the graph almost in half.

Like the adjacency-list representation of a graph, an adjacency matrix can rep resent a weighted graph. For example, if `G = (V, E)` is a weighted graph with edge-weight function `w`, we can simply store the weight `w(u ,v)` of the edge `(u, v) ∈ E` as the entry in row `u` and column `v` of the adjacency matrix.  If an edge does not exist, we can store a `null` value as its corresponding matrix entry, though for many problems it is convenient to use a value such as `0` or `∞`.

![list-vs-matrix](./images/list-vs-matrix.png)

Because the adjacency-list representation provides a compact way to represent __sparse__ graphs — those for which `|E|` is much less than `|V|^2` — it is usually the method of choice.

We may prefer an adjacency-matrix representation,  however, when the graph is __dense__ — `|E|` is close to `|V|^2` — or when we need to be able to tell quickly if there is an edge connecting two given vertices.


## Search
Searching a graph means systematically following the edges of the graph so as to visit  the vertices  of the graph.


### Breadth-first Search (BFS)
Given a graph `G = (V, E))` and a distinguished source vertex `s`,  breadth-first search  systematically  explores  the edges ofGto “discover”  every vertex that is reachable  from `s`.   It  computes  the  distance  (smallest  number  of  edges)  from `s` to each reachable  vertex.

It also produces  a __breadth-first tree__ with root `s` that contains all reachable vertices. For any vertex `v` reachable from `s`, the __simple path__ in the breadth-first tree from `s` to `v` corresponds to a _shortest path_ from `s` to `v` in `G`, that is, a path containing the smallest number of edges.

> The algorithm works on both directed and undirected graphs.

Breadth-first search is so named because it expands the frontier between discovered and undiscovered vertices uniformly across the breadth of the frontier.  That is, the algorithm discovers all vertices at distance `k` from`s` before discovering any vertices at distance `k+1`.

To keep track of progress, breadth-first search colors each vertex __white__, __gray__, or __black__.  All vertices start out white and may later become gray and then black.

Breadth-first search constructs a __breadth-first tree__,  initially containing  only it `s` root, which is the source vertex `s`. Whenever the search discovers a white vertex `v` in the course of scanning the adjacency list of an already discovered vertex `u`, the vertex `v` and the edge `(u, v)` are added to the tree. We say that `u` is the __predecessor__ or __parent__ of `v` in the breadth-first tree. Since a vertex is discovered at most once, it has at most one parent.  Ancestor and descendant relationships in the breadth-first tree are defined relative to the root `s` as usual: if `u` is on the simple path in the tree from the root `s` to vertex `v`, then `u` is an ancestor of `v` and `v` is a descendant of `u`.

![breadth-first-search](./images/breadth-first-search.png)

#### Analysis
The operations of enqueuing and dequeuing take `O(1)` time, and so the total time devoted to queue operations is `O(V)`. Because the procedure scans the adjacency list of each vertex only when the vertex is dequeued, it scans each adjacency list at most once. Since the sum of the lengths of all the adjacency lists is‚ `O(E)`, the total time spent in scanning  adjacency  lists is `O(E)`.  The overhead  for initialization  is `O(V)`, and thus the total running time of the BFS procedure is `O(V + E)`.

#### Shortest Path
Define the __shortest-path distance__ `d(s, v)` from `s` to `v` as the minimum number of edges in any path from vertex `s` to vertex `v`; if there is no path from `s` to `v`, then `d(s, v) = ∞`.  We call a path of length `d(s, v)` from `s` to `v` a __shortest path__ from `s` to `v`.

#### Theorem (Correctness of breadth-first search)
Let `G = (V, E)` be a directed or undirected graph, and suppose that BFS is run on `G` from a given source vertex `s ∈ V`. Then, during its execution, BFS discovers every  vertex `v ∈ V` that  is  reachable  from  the  sources,  and  upon  termination, `v.d = d(s, v)` for all `v ∈ V`. Moreover, for any vertex `v ≠ s` that is reachable from `s`,  one  of  the  shortest  paths  from `s` to `v` is  a  shortest  path  from `s` to `v.p` followed by the edge `(v.p, v)`.

> In other words: Breadth-first search correctly computes shortest-path distances.

#### Breadth-first trees
The  procedure  BFS  builds  a  breadth-first  tree  as  it  searches  the  graph.

For a graph `G = (V, E)` with sources, we define the predecessor subgraph of `G` as `G_p = (V_p, E_p)`, where:
* `G_p = {v ∈ V: v.p ≠ null} U {s}`
* `E_p = {(v.p, v): v ∈ V_p - {s}}`

The predecessor subgraph `G_p` is a __breadth-first tree__ if `V_p` consists of the vertices reachable from `s` and, for all `v ∈ V_p`, the subgraph `G_p` contains a unique simple path from `s` to `v` that is also a shortest path from `s` to `v` in `G`.  A breadth-first tree is in fact a tree, since it is connected and `|E_p| = |V_p| - 1`. We call the edges in `E_p` tree edges.

__Theorem__: The BFS produces a Breadth First Tree.


### Depth-first Search
Depth-first  search  explores  edges out of the most recently discovered vertex `v` that still has unexplored edges leaving it.Once all of `v`’s edges have been explored, the search “backtracks” to explore edges leaving the vertex from which `v` was discovered.  This process continues until we have discovered all the vertices that are reachable from the original source vertex. If any undiscovered vertices remain, then depth-first search selects one of them asa new source, and it repeats the search from that source. The algorithm repeats this entire process until it has discovered every vertex.

As in breadth-first search, whenever depth-first search discovers a vertex `v` dur-ing a scan of the adjacency list of an already discovered vertex `u`, it records this event  by setting `v`’s predecessor  attribute `v.p` to `u`.

Unlike  breadth-first  search,whose predecessor subgraph forms a tree, the predecessor subgraph produced bya  depth-first  search  may  be  composed  of  several  trees,  because  the  search  may repeat from multiple sources.  Therefore, we define the __predecessor subgraph__ of a depth-first search slightly differently from that of a breadth-first search:

`G_p = (V, E_p)`, where `E_p = {(v.p, v): v ∈ V and v.p ≠ null}`.

The predecessor  subgraph of a depth-first search forms a __depth-first forest__ comprising several __depth-first trees__. The edges in `E_p` are __tree edges__.

As in breadth-first search, depth-first search colors vertices during the search to indicate their state.  Each vertex is initially white, is grayed when it is _discovered_ in the search, and is blackened when it is _visited_, that is, when its adjacency list has been examined completely. This technique guarantees that each vertex ends up in exactly one depth-first tree, so that these trees are disjoint.

Besides creating a depth-first forest, depth-first search also __timestamps__ each vertex.  Each vertex `v` has two timestamps:  the first timestamp`v.d` records when `v` is first discovered (and grayed),  and the second timestamp `v.f` records when the search finishes examining `v`’s adjacency list (and blackens `v`). These timestamps provide important information about the structure of the graph and are generally helpful in reasoning about the behavior of depth-first search.

These timestamps are integers between `1` and `2|V|`, since there is one discovery event and one finishing event foreach of the `|V|` vertices. For every vertex `u`, `u.d < u.f`. Vertex `u` is `WHITE` before time `u.d`, `GRAY` between time `u.d` and time `u.f`, and `BLACK` thereafter.

![depth-first-search](./images/depth-first-search.png)

#### Properties
Per-haps  the  most  basic  property  of  depth-first  search  is  that  the  predecessor  sub-graph `G_p` does  indeed  form  a  forest  of  trees,  since  the  structure  of  the  depth-first trees exactly mirrors the structure of recursive calls of `depthFirstSearchVisit()`.That is, `u = v.p` if and only if `depthFirstSearchVisit(v)` was called during a search of `u`’s  adjacency list.  Additionally,  vertex `v` is a descendant  of vertex `u` in the depth-first forest if and only if `v` is discovered during the time in which `u` is gray.

Another important property of depth-first search is that discovery and finishing times have __parenthesis structure__.  If we represent the discovery of vertex `u` with a left parenthesis __“(u”__ and represent its finishing by a right parenthesis __“u)”__, then the  history  of discoveries  and finishings  makes a well-formed  expression  in the sense that the parentheses are properly nested.

#### Theorem (Parenthesis theorem)
In any depth-first search of a (directed or undirected) graph `G = (V, E)`,for any two vertices `u` and `v`, exactly one of the following three conditions holds:
* the intervals `[u.d, u.f]` and `[v.d, v.f]` are entirely disjoint, and neither `u` nor `v` is a descendant of the other in the depth-first forest,
* the interval `[u.d, u.f]` is  contained entirely within the interval `[v.d, v.f]`, and `u` is a descendant of `v` in a depth-first tree, or
* the interval `[v.d, v.f]` is contained entirely within the interval `[u.d, u.f]`, and `v` is a descendant of `u` in a depth-first tree.

#### Theorem (Nesting of descendants’ intervals)
Vertex `v` is a proper descendant of vertex `u` in the depth-first forest for a (directed or undirected) graph `G` if and only if `u.d < v.d < v.f < u.f`.

#### Theorem (White-path theorem)
In a depth-first forest of a (directed or undirected) graph `G = (V, E)`, vertex `v` is a descendant of vertex `u` if and only if at the time `u.d` that the search discovers `u`,there is a path from `u` to `v` consisting entirely of white vertices.

#### Classification of edges
The type of each edge canprovide important information about a graph.
We can define four edge types in terms of the depth-first forest `G_p` produced by a depth-first search on `G`:
1. __Tree edges__ are edges in the depth-first forest `G_p`. Edge `(u, v)` is a tree edge if `v` was first discovered by exploring edge `(u, v)`.
2. __Back edges__ are those edges `(u, v)` connecting a vertex `u` to an ancestor `v` in a depth-first tree. We consider self-loops, which may occur in directed graphs, to be back edges.
3. __Forward edges__ are those non-tree edges `(u, v)` connecting a vertex `u` to a descendant `v` in a depth-first tree.
4. __Cross edges__ are  all  other  edges.   They can  go  between  vertices  in  the  same depth-first tree, as long as one vertex is not an ancestor of the other, or they can go between vertices in different depth-first trees.

![edges-classification](./images/edges-classification.jpg)

The DFS algorithm has enough information to classify some edges as it encounters them.  The key idea is that when we first explore an edge `(u, v)`,the color of vertex `v` tells us something about the edge:
1. `WHITE` indicates a _tree edge_.
2. `GRAY` indicates a _back edge_.
3. `BLACK` indicates a _forward_ or _cross edge_.

![parenthesis-structure](./images/parenthesis-structure.png)

#### Theorem:
In a depth-first search of an _undirected_ graph `G`, every edge of `G` is either a tree edge or a back edge.


## Topological sort
A __topological sort__ of a __dag__ (_directed acyclic graph_) `G = (V, E)` is a linear ordering of all its vertices such that if `G` contains an edge `(u, v)`, then `u` appears before `v` in the ordering. We can view a topological sort of a graph as an ordering of its vertices along a horizontal line so that all directed edges go from left to right.

> If the graph contains a cycle,then no linear ordering is possible.

As an example that arises when Jafar gets dressed  in the morning.   The professor  must put on certain garments before others(e.g., socks before shoes). Other items may be put on in any order (e.g., socks and pants).

![topological-sort-example](./images/topological-sort-example.png)

A topological sort of this dag therefore gives an order for getting dressed.

#### Lemma
A directed graph `G` is acyclic if and only if a depth-first search of `G` yields no back edges.

#### Theorem
The `topologicalSort()` produces  a  topological  sort  of  the  directed  acyclic  graph.

_Proof_: Suppose that  DFS  is run on a given dag `G = (V, E)` to determine  finishing (time when vertex is blacken) times for its vertices.  It suffices to show that for any pair of distinct vertices `u, v ∈ V`, if `G` contains an edge from `u` to `v`, then `v.f < u.f`.  Consider any edge `(u, v)` explored by `DFS`.

* When this edge is explored, `v` cannot be gray, since then `v` would be an ancestor of `u` and `(u, v)` would be a back edge, contradicting above Lemma.  * Therefore, `v` must be either white or black. If `v` is white, it becomes a descendant of `u`, and so `v.f < u.f`.
* If `v` is black, it has already been finished/visited, so that `v.f` has already been set.

Because we are still exploring from `u`, we have yet to assign a timestamp to `u.f`, and so once we do, we will have `v.f < u.f` as well.  Thus,  for any edge `(u, v)` in the dag, we have `v.f < u.f`,  proving  the theorem.


## Strongly connected components
The __strongly connected component (SCC)__  of  a  directed graph `G = (V, E)` is a maximal set of vertices `C ⊆ V` such that for every pair of vertices `u` and `v` in `C`, we have both `u -> v` and `v -> u`; that is, vertices `u` and `v` are reachable from each other.

> A directed graph is strongly connected if there is a path between all pairs of vertices.

Transpose of graph `G` is `G^T = (V, E^T)`, where `E^T = {(u, v): (v, u) ∈ E}`. That is, `E^T` consists of the edges of `G` with their directions reversed.

It is interesting to observe that `G` and `G^T` have exactly the same strongly connected components: `u` and `v` are reach-able from each other in `G` if and only if they are reachable from each other in `G^T`.

![strongly-connected-components](./images/strongly-connected-components.png)

#### Lemma
Let `C` and `C'` be distinct strongly connected components in directed graph `G = (V, E)`, let `u, v ∈ C`, let `u', v' ∈ C'`, and suppose that `G` contains a path `u -> u'`. Then `G` cannot also contain a path `v' -> v`.

__Degree__ of a graph vertex `v` of a graph is the number of graph edges which touch `v`.

__Out-Degree__ of `u` refers to the number of edges directed away from the vertex `u`.

__In-Degree__ of `u` refers to the number of edges directed towards the vertex `u`.


## Weakly Connected Graph
A graph `G = (U, V)` is weakly connected, if the _underlying undirected graph_ of `G` is connected.

![underlying-undirected-graph](./images/underlying-undirected-graph.gif)

As you can see, the underlying undirected graph is a graph `G` without direction on edges.

## Graph Isomorphism
In mathematics, a __bijection__, one-to-one correspondence, or invertible function, is a function between the elements of two sets, where

* Each element of one set is paired with exactly one element of the other set
* Each element of the other set is paired with exactly one element of the first set.
* There are no unpaired elements.

In graph theory, an __isomorphism__ of graphs `G` and `H` is a _bijection_ between the vertex sets of `G` and `H`: `f: V(G) -> V(H)` such that any two vertices `u` and `v` of `G` are adjacent in `G` if and only if `f(u)` and `f(v)` are adjacent in `H`.

If an isomorphism exists between two graphs, then the graphs are called isomorphic and denoted as `G  H`.

In other words two graphs are isomorphic, is they have a similar structure

![graph-isomorphism](./images/graph-isomorphism.png)

### Graph isomorphism problem
The __graph isomorphism problem__ is the computational problem of determining whether two finite graphs are isomorphic.

The problem is not known to be solvable in polynomial time nor to be NP-complete.


## Eulerian Path
__Eulerian Path__ is a path in graph that visits every edge exactly once. __Eulerian Circuit__ is an Eulerian Path which starts and ends on the same vertex.

The problem is same as following question: “_Is it possible to draw a given graph without lifting pencil from the paper and without tracing any of the edges more than once?_”.

A graph is called __Eulerian__ if it has an __Eulerian Cycle__ and called Semi-Eulerian if it has an Eulerian Path.

### Undirected Graph
_An undirected graph has Eulerian Cycle_ if following two conditions are true:
* All vertices with non-zero degree are connected. We don’t care about vertices with zero degree because they don’t belong to Eulerian Cycle or Path (we only consider all edges).
* All vertices have even (четный) degree.

_An undirected graph has Eulerian Path_ if following two conditions are true:
* All vertices with non-zero degree are connected. We don’t care about vertices with zero degree because they don’t belong to Eulerian Cycle or Path (we only consider all edges).
* If zero or two vertices have odd (нечетный) degree and all other vertices have even degree. Note that only one vertex with odd degree is not possible in an undirected graph (sum of all degrees is always even in an undirected graph)

> Note that a graph with no edges is considered Eulerian because there are no edges to traverse.

![euler-01](./images/euler-01.png)
![euler-02](./images/euler-02.png)
![euler-03](./images/euler-03.png)

### Directed Graph
A directed graph has an Eulerian cycle if following conditions are true:
* All vertices with nonzero degree belong to a single strongly connected component. 
* In degree is equal to the out degree for every vertex.

### Fleury’s Algorithm
An edge in an undirected connected graph is a __bridge__ if removing it disconnects the graph. For a disconnected undirected graph, definition is similar, a bridge is an edge removing which increases number of disconnected components.

A vertex in an undirected connected graph is an __articulation point__ (or cut vertex) if removing it (and edges through it) disconnects the graph. For a disconnected undirected graph, an articulation point is a vertex removing which increases number of connected components.

Both represent vulnerabilities in a connected network and are useful for designing reliable networks.

Fleury’s Algorithm for printing Eulerian trail or cycle in an _undirected graph_:
1. Make sure the graph has either `0` or `2` odd vertices.
2. If there are `0` odd vertices, start anywhere. If there are `2` odd vertices, start at one of them.
3. Follow edges one at a time. If you have a choice between a bridge and a non-bridge, always choose the non-bridge.

## Hamiltonian Path
Hamiltonian Path in an undirected graph is a path that visits each vertex exactly once. A Hamiltonian cycle (or Hamiltonian circuit) is a Hamiltonian Path such that there is an edge (in the graph) from the last vertex to the first vertex of the Hamiltonian Path.


## Minimum Spanning Tree
Assume that we have a connected,  undirected  graph `G = (V, E)` with a weight function `w: E -> R`, where `R` is the set of real numbers.

__Spanning Tree__ `T` of _connected and undirected graph_ `G = (V, E)` is _acyclic and connected tree_ that connects all of the vertices and `T ⊆ E`.

__Minimum Spanning Tree__ is a spanning tree whose total weight `w(T)` of all edges is minimized.

![minimum-spanning-tree](./images/minimum-spanning-tree.png)

A __cut__ `(S, V-S)` of an undirected graph `G = (V, E)` is a partition of `V`.

We say that an edge `(u, v) ∈ E` __crosses__ the cut `(S, V-S)` if one of its endpoints is in `S` and the other is in `V-S`.

We say that a cut __respects__ a set `A` of edges if no edge in `A` crosses the cut.

An edge is a __light edge__ crossing a cut if its weight is the minimum of any edge crossing the cut.

![graph-cut](./images/graph-cut.png)

`A` is a subset of some minimum spanning tree. An edge `(u,v)` that we can add to `A` without violating this invariant, in the sense that `A U {(u, v)}` is also a subset of a minimum spanning tree is called __safe edge__.

A minimum spanning tree has `V – 1` edges where `V` is the number of vertices in the given graph.

#### Theorem
Let `G = (V, E)` be a connected, undirected graph with a real-valued weight function `w` defined on `E`. Let `A` be a subset of `E` that is included in some minimum spanning tree for `G`, let `(S, V-S)` be any cut of `G` that respects `A`, and let `(u, v)` be a light edge crossing `(S, V-S)`. Then, edge `(u, v)` is safe for `A`.

### Kruskal’s Algorithm
The set `A` is a forest whose vertices are all those of the given graph.

The safe edge added to `A` is always a least-weight edge in the graph that connects two distinct components.

Kruskal’s algorithm finds a safe edge to add to the growing forest by finding, of all the edges that connect any two trees in the forest, an edge `(u, v)` of least weight. So, it is a greedy algorithm.

Below are the steps for finding MST using Kruskal’s algorithm
1. Sort all the edges in non-decreasing order of their weight. 
2. Pick the smallest edge. Check if it forms a cycle with the spanning tree formed so far. If cycle is not formed, include this edge. Else, discard it. 
3. Repeat step #2 until there are `V-1` edges in the spanning tree.

#### Complexity Analysis
The time to sort the edges is `O(E lgE)`.

`findSet()` and `union()` operations on the disjoint-set forest performs `O(E)` times.  Along with the `|V|` `makeSet()` operations, these take a total of `O((V + E) * ⍺(V))` time, where `⍺` is the very slowly growing function.

Because we assume that `G` is connected, we have `|E| ≥ |V| - 1`, and so the disjoint-set operations take `O((V + E) * ⍺(V)) ≤ O(2E * ⍺(V)) ≤ O(E * ⍺(V))` time.

Moreover, since `⍺(|V|) = O(lg V) = O(lg E)`, the total running time of Kruskal’s algorithm is `O(E * lgE)`.

Observing that `|E| < |V|^2`, we have `lg|E| = O(lgV)`, and so we can restate the running time of Kruskal’s algorithm as `O(E * lgV)`.

Note: `disjointSet.findByValue()` is considered to have complexity of `O(1)`.

![kruskal-algorithm-example.png](./images/kruskal-algorithm-example.png)

### Prim's algorithm
Prim’s algorithm operates much like Dijkstra’s algorithm for finding shortest paths in a graph

Prim’s algorithm has the property that the edges in the set `A` always form  a single  tree.

Like Kruskal’s algorithm, Prim’s algorithm is also a Greedy algorithm. It starts with an empty spanning tree. The idea is to maintain two sets of vertices. The first set contains the vertices already included in the MST, the other set contains the vertices not yet included. At every step, it considers all the edges that connect the two sets, and picks the minimum weight edge from these edges. After picking the edge, it moves the other endpoint of the edge to the set containing MST.

So, at every step of Prim’s algorithm, we find a cut, pick the minimum weight edge from the cut and include this vertex to MST Set.

![prim-algorithm-example](./images/prim-algorithm-example.png)

Watch this [video](https://www.youtube.com/watch?v=eB61LXLZVqs&t=202s) to find out how the algorithm works.

#### Complexity Analysis
We can use the `buildMinHeap()` procedure to perform lines `O(V)` time. The body of the `while` loop executes `|V|` times, and since each `extractMin()` operation takes `O(lgV)` time, the total time for all calls to `extractMin()` is `O(V * lgV)`.

The `forEach()` loop executes `O(E)` times altogether, since the sum of the lengths of all adjacency lists is `2|E|`.

Within the `forEach()` loop, we can implement the test for membership in `Q` in in constant time by keeping a bit for each vertex that tells whether or not it is in `Q`, and updating the bit when the vertex is removed from `Q`.

`increasePriority()` operation on the min-heap, which a binary min-heap supports in `O(lgV)` time.  Thus, the total time for Prim’s algorithm is `O(V* lgV + E * lgV) = O(E * lgV)`, which is asymptotically the same as for our implementation of Kruskal’s algorithm.

#### Improvement
We can improve the asymptotic running time of Prim’s algorithm by using Fibonacci heaps. A Fibonacci heap holds `|V|` elements, an `extractMin()` operation  takes `O(lgV)` amortized time and a `decreaseKey()` operation takes `O(1)` amortized time. Therefore, if we use a Fibonacci heap to implement the min-priority queue, the running time of Prim’s algorithm improves to `O(E + V*lgV)`.


















---

#### [Read More](https://www.programiz.com/dsa/graph)

#### [Even more algorithms for Graphs](https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/)

#### [Kosaraju's Algorithm: Strongly Connected Components](https://www.youtube.com/watch?v=5wFyZJ8yH9Q)
