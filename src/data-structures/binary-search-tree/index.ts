/**
 * The Binary Search Tree.
 * The height of the binary tree is h = log_2(n)
 */
export class BinarySearchTree<T> {
  root: BinaryNode<T>;

  constructor(key: number, value: T) {
    this.root = new BinaryNode<T>(key, value);
  }

  /**
   * Prints the tree from left to right (from min to max).
   * @complexity O(n)
   */
  inorderTreeWalk(node?: BinaryNode<T>): void {
    if (!node) return;

    this.inorderTreeWalk(node.left);
    console.log(node.value);
    this.inorderTreeWalk(node.right);
  }

  /**
   * Prints the tree from root to leaves,
   * starting from the specified node.
   * @complexity O(n)
   */
  preorderTreeWalk(node?: BinaryNode<T>): void {}

  /**
   * Prints the tree from leaves to root,
   * starting from the specified node.
   * @complexity O(n)
   */
  postorderTreeWalk(node?: BinaryNode<T>): void {}

  /**
   * Recursively searches for a value in the binary tree starting from root.
   * @complexity O(h)
   */
  search(value: T, node: BinaryNode<T> = this.root): BinaryNode<T>|undefined {
    if (node.value === value) return node;

    if (value < node.value) {
      return this.search(value, node.left);
    } else {
      return this.search(value, node.right);
    }
  }

  /**
   * Iteratively searches for a value in the binary tree starting from root.
   * @complexity O(h)
   */
  iterativeSearch(value: T, node: BinaryNode<T> = this.root):
      BinaryNode<T>|undefined {
    let activeNode: BinaryNode<T>|undefined = node;

    while (activeNode && activeNode.value !== value) {
      if (value < activeNode.value) {
        activeNode = activeNode.left;
      } else {
        activeNode = activeNode.right;
      }
    }

    return activeNode;
  }

  /**
   * Return the pointer to the node with the minimum key.
   * @complexity O(h)
   */
  min(node: BinaryNode<T> = this.root): BinaryNode<T> {
    let current = node;

    while (current.left) {
      current = current.left;
    }

    return current;
  }

  /**
   * Return the pointer to the node with the maximum key.
   * @complexity O(h)
   */
  max(node: BinaryNode<T> = this.root): BinaryNode<T> {
    let current = node;

    while (current.right) {
      current = current.right;
    }

    return current;
  }

  /**
   * Returns the pointer to the successor of the node.
   * The successor of a node A is a node with the smallest key,
   * grater than A.key.
   * Basically if you order all tree values from min to max,
   * the successor is the item located from the right side of the item.
   * @complexity O(h)
   */
  successor(node: BinaryNode<T>): BinaryNode<T>|undefined {
    if (node.right) return this.min(node.right);

    let a = node;
    let b = node.parent;

    while (b && a === b.right) {
      a = b;
      b = b.parent;
    }

    return b;
  }

  /**
   * Return the pointer to the predecessor of the node.
   * The predecessor of a node A is the node with the greatest key,
   * smaller than A.key.
   * @complexity O(h)
   */
  predecessor(node: BinaryNode<T>): BinaryNode<T>|undefined {
    return node;
  }
}


/**
 * Binary Tree Node CLass.
 */
export class BinaryNode<T> {
  key: number;
  value: T;
  parent?: BinaryNode<T>;
  left?: BinaryNode<T>;
  right?: BinaryNode<T>;

  constructor(
      key: number,
      value: T,
      parent?: BinaryNode<T>,
      left?: BinaryNode<T>,
      right?: BinaryNode<T>,
  ) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}
