import {createArrayAndFillWith} from '../../utils';
import {SinglyLinkedList} from '../singly-linked-list';
import {SinglyLinkedListNode} from '../singly-linked-list/node';
import {AdjacencyMatrix} from './matrix';
import {Vertex} from './vertex';

/**
 * The Adjacency List Representation.
 * Example:
 * {
 *      a: (b -> e)             // edges: (a, b), (a, e)
 *      b: (a -> e -> c -> d)   // edges: (b, a), (b, e), (b, c), (b, d)
 *      c: (b -> d)             // edges: (c, b), (c, d)
 *      d: (b -> e -> c)        // edges: (d, b), (d, e), (d, c)
 *      e: (d -> a -> b)        // edges: (e, d), (e, a), (e, b)
 * }
 * Notice: There is only one set of vertices and all nodes reference them.
 *         No operation can create a duplicate vertex.
 */
export class AdjacencyList {
    /** The number of vertices. */
    private n: number;
    /** The adjacency list. */
    list: {[vertex: string]: SinglyLinkedList<AdjacencyListNode>};

    constructor(
        /**
         * Each dictionary key corresponds to a vertex.
         * Each item inside a list are descendants of the vertex.
         * Each dictionary key is parent of each list item corresponding to a key.
         * Each list a reference t a unique vertex. No vertex duplication.
         */
        array: {[vertex: string]: AdjacencyListNode[]},
        public vertices: Vertex[],
    ) {
        this.n = Object.keys(array).length;
        this.list = {};

        for (const [key, row] of Object.entries(array)) {
            this.list[key] = new SinglyLinkedList<AdjacencyListNode>(
                row,
                this.areVerticesEqual,
            );
        }
    }

    /**
     * Converts to Adjacency Matrix Graph Representation.
     * @complexity O(V * V)
     */
    toAdjacencyMatrix(): AdjacencyMatrix {
        const matrix = [] as Array<Array<number | undefined>>;
        const vertexValues = Object.keys(this.list);
        let list: SinglyLinkedList<AdjacencyListNode>;
        let row: Array<number | undefined>;
        let index: number;

        for (const value of vertexValues) {
            list = this.list[value];
            row = createArrayAndFillWith(this.n, undefined);

            list.forEach((node: SinglyLinkedListNode<AdjacencyListNode>) => {
                index = vertexValues.findIndex(
                    (key) => key === node.data.vertex.value,
                );
                row[index] = node.data.weight;
            });

            matrix.push(row);
        }

        return new AdjacencyMatrix(matrix, this.vertices);
    }

    /**
     * Returns the transposed list.
     * @complexity O(V + E)
     */
    transpose(): {[vertex: string]: AdjacencyListNode[]} {
        const list = {} as {[vertex: string]: AdjacencyListNode[]};

        for (const u of this.vertices) {
            list[u.value] = [] as AdjacencyListNode[];
        }

        for (const u of this.vertices) {
            this.list[u.value].forEach(
                (v: SinglyLinkedListNode<AdjacencyListNode>) => {
                    // Insert "u" into a list corresponding to "v" vertex.
                    list[v.data.vertex.value].push(
                        new AdjacencyListNode(u, v.data.weight),
                    );
                },
            );
        }

        return list;
    }

    /**
     * Converts to an array of strings.
     * @complexity O(V + E)
     */
    toString(): string[] {
        const array = [] as string[];
        let line: string;

        for (const [key, row] of Object.entries(this.list)) {
            line = row
                .toArray()
                .map((node) => `${node.vertex.value} (${node.weight})`)
                .join(' -> ');

            array.push(`${key} -> ${line}`);
        }

        return array;
    }

    /**
     * Adds an edge (u, v).
     * @complexity O(1)
     */
    addEdge(u: Vertex, v: Vertex, weight: number = 1): void {
        this.list[u.value].insert({
            vertex: v,
            weight,
        });
    }

    /**
     * Removes an edge (u, v).
     * @complexity O(V)
     */
    removeEdge(u: Vertex, v: Vertex): void {
        this.list[u.value].remove(new AdjacencyListNode(v));
    }

    /**
     * Adds a vertex.
     * @complexity O(1)
     */
    addVertex(vertex: Vertex): void {
        this.list[vertex.value] = new SinglyLinkedList<AdjacencyListNode>();
        this.n++;
    }

    /**
     * Removes a vertex.
     * @complexity O(V * V)
     */
    removeVertex(vertex: Vertex): void {
        const index = this.findIndex(vertex);

        if (!this.isValidIndex(index)) return;

        // Removes a vertex.
        this.vertices.splice(index!, 1);

        // Removes all edges from the vertex.
        delete this.list[vertex.value];

        // Removes all edges to the vertex.
        for (const row of Object.values(this.list)) {
            row.remove(new AdjacencyListNode(vertex));
        }

        this.n--;
    }

    /**
     * Finds index of a vertex.
     * @complexity O(V)
     */
    private findIndex(u: Vertex): number | undefined {
        return this.vertices.findIndex((v: Vertex) => v === u);
    }

    /**
     * Checks if an index is valid for the current matrix.
     * @complexity O(1)
     */
    private isValidIndex(index?: number): boolean {
        return index != null && index >= 0 && index < this.n;
    }

    /**
     * Checks if two vertices are equal.
     * @complexity O(1)
     */
    private areVerticesEqual(
        u: AdjacencyListNode,
        v: AdjacencyListNode,
    ): boolean {
        return u.vertex.value === v.vertex.value;
    }
}

/**
 * The Adjacency List Node.
 */
export class AdjacencyListNode {
    constructor(
        public vertex: Vertex,
        /** The weight of edge (vertex.predecessor, vertex). */
        public weight: number = 1,
    ) {}
}