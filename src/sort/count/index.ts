export function countSort(array: number[], min: number, max: number): number[] {
    let i: number;
    let z: number = 0;
    const count: number[] = [];

    for (i = min; i <= max; i++) {
        count[i] = 0;
    }

    for (i = 0; i < array.length; i++) {
        count[array[i]]++;
    }

    for (i = min; i <= max; i++) {
        while (count[i]-- > 0) {
            array[z++] = i;
        }
    }

    return array;
}

function sort(array: number[], maxValue: number): number[] {
    const buckets = new Array(maxValue + 1);
    let sortedIndex = 0;
    let i;

    for (i = 0; i < array.length; i++) {
        if (!buckets[array[i]]) {
            buckets[array[i]] = 0;
        }
        buckets[array[i]]++;
    }

    for (i = 0; i < buckets.length; i++) {
        while (buckets[i] > 0) {
            array[sortedIndex++] = i;
            buckets[i]--;
        }
    }

    return array;
}
