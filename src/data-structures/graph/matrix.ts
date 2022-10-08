import {createArrayAndFillWith} from '../../utils';
import {Matrix} from '../matrix';
import {AdjacencyList, AdjacencyListNode} from './list';
import {Vertex} from './vertex';

/**
 * The Adjacency Matrix Representation.
 * Example:
 * matrix: [
 *        a    b    c    d    e
 *    a [null  1   null null  1  ]  // edges: (a, b), (a, e)
 *    b [ 1   null  1    1    1  ]  // edges: (b, a), (b, c), (b, d), (b, e)
 *    c [null  1   null  1   null]  // edges: (c, b), (c, d)
 *    d [null  1    1   null  1  ]  // edges: (d, b), (d, c), (d, e)
 *    e [ 1    1   null  1   null]  // edges: (e, a), (e, b), (e, d)
 *
 * ]
 * vertexValues: [a, b, c, d, e]
 */
export class AdjacencyMatrix<T = string> {
    /** The matrix order. The number of vertices. */
    private n: number;

    constructor(
        public matrix: Array<Array<number | undefined>>,
        public vertices: Array<Vertex<T>>,
    ) {
        this.n = matrix.length;
    }

    /**
     * Converts to Adjacency List Graph Representation.
     * @time O(V^2)
     */
    toAdjacencyList(): AdjacencyList<T> {
        const list = {} as {[vertex: string]: Array<AdjacencyListNode<T>>};
        /** The array representation of the final list. */
        let array: Array<AdjacencyListNode<T>>;
        /** The adjacency list key. The fist node in a list. */
        let vertex: Vertex<T>;

        for (let i = 0; i < this.n; i++) {
            vertex = this.vertices[i];
            array = [];

            for (let j = 0; j < this.n; j++) {
                if (this.matrix[i][j] == null) continue;

                array.push(
                    new AdjacencyListNode(this.vertices[j], this.matrix[i][j]!),
                );
            }

            list[vertex.value] = array;
        }

        return new AdjacencyList(list, this.vertices);
    }

    /**
     * Returns an undirected, unweighted matrix.
     * @time O(V * V)
     */
    underlyingUndirectedMatrix(): Array<Array<number | undefined>> {
        const matrix = Matrix.createMatrixAndFillWith(
            this.n,
            this.n,
            undefined,
        ) as Array<Array<number | undefined>>;

        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.matrix[i][j] == null) continue;

                matrix[i][j] = 1;
                matrix[j][i] = 1;
            }
        }

        return matrix;
    }

    /**
     * Adds a (u, v) edge.
     * @time O(V)
     */
    addEdge(u: Vertex<T>, v: Vertex<T>, weight: number = 1): void {
        this.setWeight(u, v, weight);
    }

    /**
     * Removes a (u, v) edge.
     * @time O(V)
     */
    removeEdge(u: Vertex<T>, v: Vertex<T>): void {
        this.setWeight(u, v);
    }

    /**
     * Add a vertex.
     * @time O(V)
     */
    addVertex(vertex: Vertex<T>): void {
        this.vertices.push(vertex);

        // Add a column.
        for (const row of this.matrix) {
            row.push(undefined);
        }

        // Add a row.
        this.matrix[this.n] = createArrayAndFillWith<number | undefined>(
            this.n + 1,
            undefined,
        );

        this.n++;
    }

    /**
     * Removes a vertex.
     * @time O(V * V)
     */
    removeVertex(vertex: Vertex<T>): void {
        const index = this.findIndex(vertex);

        if (!this.isValidIndex(index)) return;

        // Remove a vertex.
        this.vertices.splice(index!, 1);

        // Remove a row.
        this.matrix.splice(index!, 1);

        // Remove a column.
        for (const row of this.matrix) {
            row.splice(index!, 1);
        }

        this.n--;
    }

    /**
     * Sets a weight to (u, v).
     * @time O(V)
     */
    private setWeight(u: Vertex<T>, v: Vertex<T>, weight?: number): void {
        const uIndex = this.findIndex(u);
        const vIndex = this.findIndex(v);

        if (!this.isValidIndex(uIndex) || !this.isValidIndex(vIndex)) return;

        this.matrix[uIndex!][vIndex!] = weight;
    }

    /**
     * Finds index of a vertex.
     * @time O(V)
     */
    private findIndex(u: Vertex<T>): number | undefined {
        return this.vertices.findIndex((v: Vertex<T>) => v === u);
    }

    /**
     * Checks if an index is valid for the current matrix.
     * @time O(1)
     */
    private isValidIndex(index?: number): boolean {
        return index != null && index >= 0 && index < this.n;
    }
}
