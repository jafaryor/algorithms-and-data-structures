    /**
     * Depth-First graph searching algorithm.
     * Returns whether there's a path between two nodes in a graph.<br><br>
     * Time complexity: O(|V|^2).
     *
     * @module graphs/searching/dfs
     * @public
     * @param {Array} graph Adjacency matrix, which represents the graph.
     * @param {Number} start Start node.
     * @param {Number} goal Target node.
     * @return {Boolean} Returns true if path between two nodes exists.
     *
     * @example
     * var dfs = require('../src/graphs/searching/dfs').dfs;
     * var graph = [[1, 1, 0, 0, 1, 0],
     *              [1, 0, 1, 0, 1, 0],
     *              [0, 1, 0, 1, 0, 0],
     *              [0, 0, 1, 0, 1, 1],
     *              [1, 1, 0, 1, 0, 0],
     *              [0, 0, 0, 1, 0, 0]];
     * var pathExists = dfs(graph, 1, 5); // true
     */
    function hasPath(graph, current, goal) {
        var stack = [];
        var visited = [];
        var node;
        stack.push(current);
        visited[current] = true;
        while (stack.length) {
        node = stack.pop();
        if (node === goal) {
            return true;
        }
        for (var i = 0; i < graph[node].length; i += 1) {
            if (graph[node][i] && !visited[i]) {
            stack.push(i);
            visited[i] = true;
            }
        }
        }
        return false;
    }


  
    /**
     * Breath-First graph searching algorithm.
     * Returns the shortest path between startNode and targetNode.<br><br>
     * Time complexity: O(|V|^2).
     *
     * @public
     * @module graphs/searching/bfs
     * @param {Array} graph Adjacency matrix, which represents the graph.
     * @param {Number} startNode Start node.
     * @param {Number} targetNode Target, which should be reached.
     * @returns {Array} Shortest path from startNode to targetNode.
     *
     * @example
     * var bfs = require('path-to-algorithms/src/graphs/searching/bfs').bfs;
     * var graph = [[1, 1, 0, 0, 1, 0],
     *              [1, 0, 1, 0, 1, 0],
     *              [0, 1, 0, 1, 0, 0],
     *              [0, 0, 1, 0, 1, 1],
     *              [1, 1, 0, 1, 0, 0],
     *              [0, 0, 0, 1, 0, 0]];
     * var shortestPath = bfs(graph, 1, 5); // [1, 2, 3, 5]
     */

    function buildPath(parents, targetNode) {
    var result = [targetNode];
    while (parents[targetNode] !== null) {
        targetNode = parents[targetNode];
        result.push(targetNode);
    }
    return result.reverse();
    }

    return function (graph, startNode, targetNode) {
    var parents = [];
    var queue = [];
    var visited = [];
    var current;
    queue.push(startNode);
    parents[startNode] = null;
    visited[startNode] = true;
    while (queue.length) {
        current = queue.shift();
        if (current === targetNode) {
        return buildPath(parents, targetNode);
        }
        for (var i = 0; i < graph.length; i += 1) {
        if (i !== current && graph[current][i] && !visited[i]) {
            parents[i] = current;
            visited[i] = true;
            queue.push(i);
        }
        }
    }
    return null;
    };