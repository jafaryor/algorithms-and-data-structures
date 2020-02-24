import { swap } from '../utils';

function findPairLessOrEqual(flightLength, movieLengths) {
    let min = Infinity;
    let minIndex;

    // find the min value and its index
    for (let i = 0; i < movieLengths.length; i++) {
        if (movieLengths[i] < min) {
            min = movieLengths[i];
            minIndex = i;
        }
    }

    // move the min to first position
    swap(movieLengths, 0, minIndex);

    // go look for a pair of min which gives us sum less or equal than flightLength
    for (let i = 1; i < movieLengths.length; i++) {
        if (min + movieLengths[i] <= flightLength) {
            // the pair have been found
            return true;
        }
    }

    // didn’t find such pir
    return false;
}

console.log(findPairLessOrEqual(4, [10, 4, 9, 5, 1, 6, 8]));
