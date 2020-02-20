function BinarySearchUtil(node, min, max) {
    if (!node) return true;

    var left = BinarySearchUtil(node.left, min, node.data);
    var right = BinarySearchUtil(node.right, node.data, max);

    if (node.data > min && node.data <= max) {
        return left && right;
    }
    return false;
}