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
   * Prints the tree from left to right,
   * starting from the specified node.
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
