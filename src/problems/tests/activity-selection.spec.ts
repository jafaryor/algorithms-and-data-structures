import {
    recursiveActivitySelector,
    iterativeActivitySelector,
    Activity,
} from '../activity-selection';

describe('Activity Selection Problem', () => {
    const activities: Activity[] = [
        {
            start: 1,
            end: 4,
        },
        {
            start: 3,
            end: 5,
        },
        {
            start: 0,
            end: 6,
        },
        {
            start: 5,
            end: 7,
        },
        {
            start: 3,
            end: 9,
        },
        {
            start: 5,
            end: 9,
        },
        {
            start: 6,
            end: 10,
        },
        {
            start: 8,
            end: 11,
        },
        {
            start: 8,
            end: 12,
        },
        {
            start: 2,
            end: 14,
        },
        {
            start: 12,
            end: 16,
        },
    ];
    const expectedResult = [
        activities[0],
        activities[3],
        activities[7],
        activities[10],
    ];

    it('11 activity recursive', () => {
        const result = recursiveActivitySelector(activities);

        expect(result).toEqual(expectedResult);
    });

    it('11 activity iterative', () => {
        const result = iterativeActivitySelector(activities);

        expect(result).toEqual(expectedResult);
    });
});
