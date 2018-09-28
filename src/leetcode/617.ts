/*
    Given two binary trees and imagine that when you put one of them to cover the other,
    some nodes of the two trees are overlapped while the others are not.

    You need to merge them into a new binary tree. The merge rule is that if two nodes
    overlap, then sum node values up as the new value of the merged node. Otherwise,
    the NOT null node will be used as the node of new tree.
*/

interface ITreeNode {
    value: number;
    left?: ITreeNode;
    right?: ITreeNode;
}

/**
 * merges two trees
 * @param root01 - root of the first tree
 * @param root02 - root of the second tree
 */
export function mergeBinaryTrees(root01: ITreeNode, root02: ITreeNode): ITreeNode {
    const result: ITreeNode = { value: (root01 ? root01.value : 0) + (root02 ? root02.value : 0) };

    if ((root01 && root01.left) || (root02 && root02.left)) {
        result.left = mergeBinaryTrees(root01.left, root02.left);
    }

    if ((root01 && root01.right) || (root02 && root02.right)) {
        result.right = mergeBinaryTrees(root01.right, root02.right);
    }

    return result;
}
