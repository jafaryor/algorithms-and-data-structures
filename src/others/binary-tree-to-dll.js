'use strict';
/*
    Given a Binary Tree (BT), convert it to a Doubly Linked List(DLL) In-Place.
    The left and right pointers in nodes are to be used as previous and next
    pointers respectively in converted DLL. The order of nodes in DLL must be
    same as Inorder of the given Binary Tree. The first node of Inorder traversal
    (left most node in BT) must be head node of the DLL.
*/

class treeNode {
    constructor(data) {
        this.value = data;
        this.left = null;
        this.right = null;
    }
}

/**
 * @param {treeNode} root - tree root
 * @param {number[]} list - doubly linked list
 * @return {number[]}
 */
function treeToDll(root, list) {
    if (root.left) {
        treeToDll(root.left, list);
    }

    list.push(root.value);

    if (root.right) {
        treeToDll(root.right, list);
    }

    return list;
}

const tree = new treeNode(10); //                   10
tree.right = new treeNode(15); //               /      \
tree.left = new treeNode(12); //               12        15
tree.right.left = new treeNode(36); //        /  \      /
tree.left.left = new treeNode(25); //      25   30    36
tree.left.right = new treeNode(30);

const res = treeToDll(tree, []);
console.log(res); // [ 25, 12, 30, 10, 36, 15 ]
