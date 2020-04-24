## Spay Trees
Splay trees are self-adjusting binary search trees i.e., they adjust their nodes after accessing them. So, after searching, inserting or deleting a node, the tree will get adjusted.

Splay trees put the most recently accessed items near the root based on the principle of locality; __90-10 rule__ which states that 10% of the data is accessed 90% of the time, other 90% of data is only accessed only 10% of the time.

__Splaying__ is a process in which a node is transferred to the root by performing suitable rotations. In a splay tree, whenever we access any node, it is splayed to the root.

> A splay tree is not always a balanced tree and may become unbalanced after some operations.

---

#### [Read More](https://www.codesdope.com/course/data-structures-splay-trees/)
