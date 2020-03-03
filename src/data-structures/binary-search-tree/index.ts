/**
 * The Binary Search Tree.
 * [ left < root >= right ]
 * The height of the binary tree is h = log_2(n)
 */
export class BinarySearchTree<T> {
  root: BinaryNode<T>;
  inorderWalkLogs: number[] = [];

  constructor(key: number, value: T) {
    this.root = new BinaryNode<T>(key, value);
  }

  /**
   * Prints the tree in the following pattern: [ left | parent | right ]
   * Prints the left -> root -> right
   * @complexity O(n)
   */
  inorderTreeWalk(node?: BinaryNode<T> = this.root): void {
    if (!node) return;

    this.inorderTreeWalk(node.left);

    console.log(node.value);
    // logging logic - start.
    if (node === this.root) this.inorderWalkLogs = [];
    this.inorderWalkLogs.push(node.key);
    // end.

    this.inorderTreeWalk(node.right);
  }

  /**
   * Prints the tree in the following pattern: [ parent | left | right ]
   * Prints children -> root
   * @complexity O(n)
   */
  preorderTreeWalk(node?: BinaryNode<T>): void {
    if (!node) return;

    console.log(node.value);

    this.preorderTreeWalk(node.left);
    this.preorderTreeWalk(node.right);
  }

  /**
   * Prints the tree in the following pattern: [ left | right | parent ]
   * Prints root -> children
   * @complexity O(n)
   */
  postorderTreeWalk(node?: BinaryNode<T>): void {
    if (!node) return;

    this.postorderTreeWalk(node.left);
    this.postorderTreeWalk(node.right);

    console.log(node.value);
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
    if (node.left) return this.max(node.left);

    let a = node;
    let b = node.parent;

    while (b && a === b.left) {
      a = b;
      b = b.parent;
    }

    return b;
  }

  /**
   * Inserts a new node into the tree. (Recursive approach)
   * @complexity O(h)
   */
  insert(newNode: BinaryNode<T>, node: BinaryNode<T> = this.root): void {
    if (!this.root) {
      this.root = newNode;
    }

    if (newNode.key < node.key) {
      if (node.left)
        return this.insert(newNode, node.left);
      else {
        newNode.parent = node;
        node.left = newNode;
      }
    } else {
      if (node.right)
        return this.insert(newNode, node.right);
      else {
        newNode.parent = node;
        node.right = newNode;
      }
    }
  }

  /**
   * Inserts a new node into the tree. (Iterative approach)
   * @complexity O(h)
   */
  iterativeInsert(newNode: BinaryNode<T>, node: BinaryNode<T> = this.root):
      void {
    let a: BinaryNode<T>|undefined = node;
    let b: BinaryNode<T>;

    while (a) {
      b = a;
      a = newNode.key < a.key ? a.left : a.right;
    }

    newNode.parent = b;

    if (!b)
      this.root = newNode;
    else if (newNode.key < b.key)
      b.left = newNode;
    else
      b.right = newNode;
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
