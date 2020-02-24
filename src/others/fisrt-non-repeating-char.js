/*
    Given a string, find the first non-repeating character in it.
    For example, if the input string is “GeeksforGeeks”, then output
    should be ‘f’ and if input string is “GeeksQuiz”, then output
    should be ‘G’.
*/

function findNonRepeatingChars(str) {
    const charCounts = Array.from(str)
        .reduce((counts, char) => {
            if (counts[char]) {
                ++counts[char];
            } else {
                counts[char] = 1;
            }

            return counts;
        }, {});

    return Object.entries(charCounts)
        .filter(count => count[1] === 1);
}

const res = findNonRepeatingChars('geeksforgeeks');
console.log(res);