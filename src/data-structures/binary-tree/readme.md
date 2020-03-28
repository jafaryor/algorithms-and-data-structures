## Binary Tree
A __binary tree__ is a tree in which every node has at most two children.

__Full Binary Tree__ - A binary tree in which every node has 2 children except the leaves.

__Complete Binary Tree__ - A binary tree which is completely filled with a possible exception at the bottom level i.e., the last level may not be completely filled and the bottom level is filled from left to right.

__Perfect Binary Tree__ - In a perfect binary tree, each leaf is at the same level and all the interior nodes have two children.

__Theorem:__ Perfect binary tree will have the maximum number of nodes for all alternative binary trees of the same height and it will be `2^(h+1) - 1`.

__Theorem:__ The height of a perfect binary tree with `n` nodes is `h = lg((n + 1) / 2)`.


### Array representation of Binary Tree
for a node `i`, the parent is &lfloor;`i / 2`&rfloor;, the left child is `2i` and the right child is `2i + 1`.

### Storing
Binary trees can also be stored in breadth-first order as an arrays, and if the tree is a complete binary tree, this method wastes no space.

In this compact arrangement, if a node has an index `i`, its children are found at indices `2i + 1` (for the left child) and `2i + 2` (for the right), while its parent (if any) is found at index `(i - 1) / 2` (assuming the root has index zero). 

This method benefits from more compact storage and better locality of reference, particularly during a preorder traversal. However, it is expensive to grow and wastes space proportional to &lfloor;`2^h - n`&rfloor; for a tree of depth `h` with `n` nodes.

---

#### [Read More](https://www.codesdope.com/course/data-structures-binary-trees/)
