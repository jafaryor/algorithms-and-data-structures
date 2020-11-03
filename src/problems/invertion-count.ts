/*
    Give an algorithm that determines the number of inversions in any
    permutation on n elements in O(n lg n) worst-case time.

    Let A[1..n] be an array of n distinct numbers. If i<j and A[i]>A[j],
    then the pair (i,j) is called an inversion of A.

    reversed array [1, 2, ... n] has (n-1) + (n-2) + ... + 1 = n * (n - 1) /2 invertions
*/
class InvertionCounter {
    private k: number = 0;

    count(array: number[]): number {
        this.k = 0;
        this.mergeSort(array);

        return this.k;
    }

    private merge(left: number[], right: number[]): number[] {
        const result: number[] = [];
        let i: number = 0; // for left array
        let j: number = 0; // for right array

        // compare the arrays item by item and fill the result array
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                result.push(left[i]);
                ++i;
            } else {
                result.push(right[j]);
                // counting inverion pairs
                this.k += left.length - i;
                ++j;
            }
        }

        // merge the rest part of the longest array
        return [...result, ...left.slice(i), ...right.slice(j)];
    }

    private mergeSort(array: number[]): number[] {
        if (array.length <= 1) {
            // return if empty array or one item is in the array
            return array;
        }

        // get the middle item of the array rounded down
        const middle: number = Math.floor(array.length / 2);
        // items on the left side
        const left: number[] = array.slice(0, middle);
        // items on the right side
        const right: number[] = array.slice(middle);

        return this.merge(this.mergeSort(left), this.mergeSort(right));
    }
}

export const invertionCounter = new InvertionCounter();
