let arr = [ [0, 0, 1, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 1, 0, 0, 1, 0, 1],
            [0, 1, 0, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 1, 1, 0],
            [1, 0, 1, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0] ];


function toGraph(arr) {
    var graph = {}; // this will hold the node "IDs"
    for (var i = 0; i < arr.length; i++) {
        // "create node" if the it's not added in the graph yet
        graph[arr[i][0]] = graph[arr[i][0]] || {};
        graph[arr[i][1]] = graph[arr[i][1]] || {};
        // add bidirectional "edges" to the "vertices"
        // Yes, we set the value to null, but what's important is to add the key.
        graph[arr[i][0]][arr[i][1]] = null;
        graph[arr[i][1]][arr[i][0]] = null;
    }
    return graph;
}

// to be called after getting the result from toGraph(arr)
function getSubGraphs(graph) {
    var subGraphs = []; // array of connected vertices
    var visited = {};
    for (var i in graph) { // for every node...
        var subGraph = dfs(graph, i, visited); // ... we call dfs
        if (subGraph != null) // if vertex is not added yet in another graph
        subGraphs.push(subGraph);
    }
    return subGraphs;
}

// it will return an array of all connected nodes in a subgraph
function dfs(graph, node, visited) {
    if (visited[node]) return null; // node is already visited, get out of here.
    var subGraph = [];
    visited[node] = true;
    subGraph.push(node);
    for (var i in graph[node]) {
        var result = dfs(graph, i, visited);
        if (result == null) continue;
        subGraph = subGraph.concat(result);
    }
    return subGraph;
}

// let subGraphs = getSubGraphs(toGraph(arr))
// console.log(subGraphs);



let total = 0;
for(let i=0; i<arr.length; i++){
    for(let j=0; j<arr[i].length; j++){
        if(arr[i][j] == 1){
            total ++;
            findIslands(arr,i,j);
        }

    }
}
console.log("Total number of islands is " + total);

function findIslands(mx, x, y) {
    try {
        if (mx[x][y] == 1) {
            mx[x][y] = 0;
            findIslands(mx, x + 1, y);
            findIslands(mx, x, y + 1);
            findIslands(mx, x - 1, y);
            findIslands(mx, x, y - 1);
        }
    } catch(e) {
        
    }
    
}