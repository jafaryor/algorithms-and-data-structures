## Red-Black Tree
A __red-black tree__ is a binary search tree with one extra bit of storage per node: its _color_, which can be either `RED` or `BLACK`.

A red-black tree is a binary tree that satisfies the following red-black properties:
1. Every node is either red or black.
2. The root is black.
3. Every leaf (`NIL`) is black.
4. If a node is red, then both its children are black.
5. For each node, all simple paths from the node to descendant leaves contain the same number of black nodes.

![a-red-black-tree](../../images/a-red-black-tree.png)

To simplify the algorithms, we use the `T.nil` sentinel. It basically represents a `NIL` leafs which have black color.

A binary tree is __balanced__ if for any two leaves the difference of the depth is at most __1__.

> The height of every balanced tree is `O(lg n)`.

Red-black trees are one of many search-tree schemes that are “balanced” in order to guarantee that basic dynamic-set operations take `O(lg n)` time in the worst case.

__Black height - `bh(x)`__ is number of black nodes on any simple path from a node `x` (not including it) to a leaf.

> According to property 5, the number of black nodes from a node to any leaf is the same.

__Lemma:__ A red-black tree with `n` internal nodes can has maximum height of `2lg(n + 1)`.

As an immediate consequence of this lemma, we can implement the dynamic-set operations SEARCH, MINIMUM, MAXIMUM, SUCCESSOR, and PREDECESSOR in `O(lg n)` time on red-black trees, since each can run in `O(h)` time on a binary search tree of height `h` and any red-black tree on `n` nodes is a binary search tree with height `O(lg n)`.

### Rotations
Because _INSERT_ and _DELETE_ modify the tree, the result may violate the red-black properties. To restore these properties, we must change the colors of some of the nodes in the tree and also change the pointer structure. We change the pointer structure through __rotation__, which is a local operation in a search tree that preserves the binary-search-tree property.

![rbt-rotations](../../images/rbt-rotations.png)

> Rotations doesn't violate the property of binary search trees.

### Insertion
To guarantee that the red-black properties are preserved, we then call an auxiliary procedure __FIXUP__ to recolor nodes and perform rotations.

Which of the red-black properties might be violated upon the call to _FIXUP_?
* Property 1 certainly continues to hold, as does property 3.
* Property 5, which says that the number of black nodes is the same on every simple path from a given node, is satisfied as well, because node replaces the (black) leaf, and node is red.
* The only properties that might be violated are property 2, which requires the root to be black, and property 4, which says that a red node cannot have a red child. Both possible violations are due to being colored red.
* Property 2 is violated if node is the root.
* Property 4 is violated if node’s parent is red.

The complexity of insertion operation is `O(lg n)` because the Red-Black Tree is a __BALANCED TREE__.

The complexity of _FIXUP_ is `O(lg n)` because at each iteration it jump two level up till it reaches the root. The height of the Red-Black tree is `log_2(n)`.

### Deletion
The deletion process in a red-black tree is also similar to the deletion process of a normal binary search tree. Similar to the insertion process, we will make a separate function to fix any violations of the properties of the red-black tree.

---

#### [Read More](https://www.codesdope.com/course/data-structures-red-black-trees/)

#### [Red-Black Tree Visualization](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html)
