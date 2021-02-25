import { Graph } from "../data-structures/graph";
import { Edge, Vertex } from "../data-structures/graph/vertex";
import { randomFromArray } from "../utils";

// ======================================================================
// The Vertex-Cover Problem
// ======================================================================

/**
 * The approximation algorithm for the Vertex-Cover Problem.
 * @complexity O(E^2)
 */
export function approxVertexCover(graph: Graph): Edge[] {
    const cover = [] as Edge[];
    let edges = [...graph.edges];
    let edge: Edge;

    // Repeatedly pick random an edge (u, v) and
    // delete all edges that are covered by either u or v.
    while (edges.length > 0) {
        edge = randomFromArray(edges);
        cover.push(edge);

        edges = removeIncidentEdgesOn(edge.u, edges);
        edges = removeIncidentEdgesOn(edge.v, edges);
    }

    return cover;
}

/**
 * Removes all edges incident on a vertex.
 * @complexity O(E)
 */
function removeIncidentEdgesOn(vertex: Vertex, edges: Edge[]): Edge[] {
    const result = [] as Edge[];
    
    for (const edge of edges) {
        if (edge.u === vertex || edge.v === vertex) continue;

        result.push(edge);
    }

    return result;
}

// ======================================================================
// The Traveling-Salesman Problem
// ======================================================================

/**
 * The approximation algorithm for the Traveling-Salesman Problem.
 * @complexity O(E + V*lgV)
 */
export function approxTourFrom(root: Vertex, graph: Graph): Edge[] {
    const minSpanningTree = graph.primMinimumSpanningTree(root);

    // The list is ordered according to when
    // they are first visited in a pre-order tree walk.
    return minSpanningTree;
}

// ======================================================================
// The Set-Covering Problem
// ======================================================================

/**
 * The approximation greedy algorithm for the Set-Covering Problem
 * @complexity O(|set| * |family|)
 */
export function approxSetCover<T>(set: Set<T>, family: Set<Set<T>>): Set<Set<T>> {
    /** The set of remaining uncovered elements. */
    const uncovered = new Set<T>(set);
    const cover = new Set<Set<T>>();
    let maxSubset: Set<T>;
    let maxSize = -Infinity;

    while (uncovered.size > 0) {
        // Select a subset of family set that maximizes |subset ∩ uncovered|.
        // That is choose a subset maxSubset that covers
        // as many uncovered elements as possible.
        family.forEach((subset: Set<T>) => {
            if (subset.size > maxSize && !cover.has(subset)) {
                maxSubset = subset;
            }
        });

        // uncovered = uncovered - maxSubset.
        maxSubset!.forEach((element: T) => {
            uncovered.delete(element);
        });

        // cover = cover ∪ maxSubset.
        cover.add(maxSubset!);
    }

    return cover;
}
