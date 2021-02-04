import {FlowNetwork} from '.';
import {createArrayAndFillWith} from '../../utils';

describe('Flow Network', () => {
    let flowNetwork: FlowNetwork;
    let matrix: Array<Array<number | undefined>>;
    let vertexValues: string[];

    describe('edmondsKarpMaxFlow', () => {
        let maxFlow: number;
        let maxFlowPath: string[];

        describe('Ford Fulkerson Work Case', () => {
            beforeAll(() => {
                vertexValues = ['s', 'u', 'v', 't'];
                matrix = [
                    [undefined, 100, 100, undefined],
                    [undefined, undefined, 1, 100],
                    [undefined, undefined, undefined, 100],
                    createArrayAndFillWith(4, undefined),
                ];
                flowNetwork = new FlowNetwork({matrix, vertexValues}, 0, 3);

                const max = flowNetwork.edmondsKarpMaxFlow();

                maxFlow = max.maxFlow;
                maxFlowPath = max.maxFlowPath;
            });

            it('maxFlow', () => {
                expect(maxFlow).toEqual(200);
            });

            it('maxFlowPath', () => {
                expect(maxFlowPath).toEqual([
                    '(s, u) = 100',
                    '(s, v) = 100',
                    '(u, t) = 100',
                    '(v, t) = 100',
                ]);
            });
        });

        describe('Medium size flow network', () => {
            beforeAll(() => {
                vertexValues = ['s', '1', '2', '3', '4', 't'];
                matrix = [
                    [undefined, 16, 13, undefined, undefined, undefined],
                    [undefined, undefined, undefined, 12, undefined, undefined],
                    [undefined, 4, undefined, undefined, 14, undefined],
                    [undefined, undefined, 9, undefined, undefined, 20],
                    [undefined, undefined, undefined, 7, undefined, 4],
                    createArrayAndFillWith(6, undefined),
                ];
                flowNetwork = new FlowNetwork({matrix, vertexValues}, 0, 5);

                const max = flowNetwork.edmondsKarpMaxFlow();

                maxFlow = max.maxFlow;
                maxFlowPath = max.maxFlowPath;
            });

            it('maxFlow', () => {
                expect(maxFlow).toEqual(23);
            });

            it('maxFlowPath', () => {
                expect(maxFlowPath).toEqual([
                    '(s, 1) = 12',
                    '(s, 2) = 11',
                    '(1, 3) = 12',
                    '(2, 4) = 11',
                    '(3, t) = 19',
                    '(4, 3) = 7',
                    '(4, t) = 4',
                ]);
            });
        });

        describe('Large size flow network', () => {
            beforeAll(() => {
                vertexValues = [
                    's',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    't',
                ];
                matrix = [
                    [
                        undefined,
                        5,
                        10,
                        5,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                    ],
                    [
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        10,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                    ],
                    [
                        undefined,
                        15,
                        undefined,
                        undefined,
                        undefined,
                        20,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                    ],
                    [
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        10,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                    ],
                    [
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        25,
                        undefined,
                        10,
                        undefined,
                        undefined,
                        undefined,
                    ],
                    [
                        undefined,
                        undefined,
                        undefined,
                        5,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        30,
                        undefined,
                        undefined,
                    ],
                    [
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        5,
                        10,
                        undefined,
                    ],
                    [
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        5,
                    ],
                    [
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        15,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        15,
                    ],
                    [
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        10,
                    ],
                    createArrayAndFillWith(11, undefined),
                ];
                flowNetwork = new FlowNetwork({matrix, vertexValues}, 0, 5);

                const max = flowNetwork.edmondsKarpMaxFlow();

                maxFlow = max.maxFlow;
                maxFlowPath = max.maxFlowPath;
            });

            it('maxFlow', () => {
                expect(maxFlow).toEqual(20);
            });

            it('maxFlowPath', () => {
                expect(maxFlowPath).toEqual([
                    '(s, 1) = 5',
                    '(s, 2) = 10',
                    '(s, 3) = 5',
                    '(1, 4) = 5',
                    '(2, 5) = 10',
                    '(3, 6) = 5',
                    '(4, 5) = 10',
                    '(6, 8) = 5',
                    '(8, 4) = 5',
                ]);
            });
        });
    });
});
