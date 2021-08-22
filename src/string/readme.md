# String Algorithms
## String Sort
We consider two fundamental different approaches to string sorting:
1. The first approach examines the characters in the keys in a right-to-left order. Such methods are generally referred to as __least-significant-digit__ (__LSD__) string sorts.

    Use of the term _digit_ instead of character traces back to the application of the same basic meth-od to numbers of various types. Thinking of a string as a base-256 number, considering characters  from  right  to  left  amounts  to  considering  first  the  least  significant  digits.
    
    This approach is the method of choice for string-sorting applications where all the keys are the same length.

    > __LSD string sort stably sorts fixed-length strings.__

    > __LSD string sort uses `~7WN + 3WR` array accesses and extra  space  proportional  to `N + R`  to  sort `N`  items  whose  keys  are `W`-character strings taken from an `R`-character alphabet.__

    > __The running time of LSD in the worst case is linear.__

    For typical applications, `R` is far smaller than `N`, so it implies that the total running time is proportional to `WN`. An input array of `N` strings that each have `W`-characters has a total of `WN` characters, so the running time of LSD string sort is linear in the size of the input.

2. The  second  approach  examines  the  characters  in  the  keys  in  a  left-to-right  order, working with the most significant character first.  These methods are generally referred to  as  __most-significant-digit__  (__MSD__)  string  sorts—we  will  consider  two  such  methods in this section.

   * __MSD__ 

        MSD string sorts are attractive because they can get a sorting job done without necessarily examining all of the input characters.  MSD string sorts are similar to quicksort, because they partition the array to be sorted into independent pieces such that  the  sort  is  completed  by  recursively  applying  the  same  method  to  the  subarrays. The  difference  is  that  MSD  string  sorts  use  just  the  first  character  of  the  sort  key  to do  the  partitioning,  while  quicksort  uses  comparisons  that  could  involve  examining the whole key.

        The strings are not necessarily same length.

        We  use  key-indexed  counting  to  sort  the  strings  according  to their first character, then (recursively) sort the subarrays corresponding to each character (excluding the first character, which we know to be the same for  each  string  in  each  subarray).

        > __MSD string sort stably sorts various-length strings.__

        Pitfalls:
        * Small subarrays

            Using Insertion sort for small subarrays in MSD is MUST. Mainly due to high memory consumption ("count" array). Especially for large alphabets.

        * Equal strings

            MSD can  be  relatively  slow  for  subarrays  containing  large numbers  of  equal  keys.  If  a  substring  occurs  sufficiently often  that  the  cutoff  for  small  subarrays  does  not  ap-ply,  then  a  recursive  call  is  needed  for  every  character in  all  of  the  equal  keys. Thus,  the  worst  case  for  MSD  string  sorting  is  when  all keys are equal.

        * Extra space

            To do the partitioning, MSD uses two auxiliary arrays: the temporary  array for distributing keys (`auxiliary[]`) and the array that holds the counts that are trans-formed into partition indices (`count[]`).  The `auxiliary[]` array is of size `N` and can be created outside the recursive `sort()` method. This extra space can be eliminated by sacrificing stability, but it is often not a major concern in practical applications of MSD string sort. Space for the `count[]` array, on the other hand, can be an important issue (because it cannot be created outside the recursive helper method).

            > __To sort `N` random strings from an `R`-character alphabet, MSD string sort examines about `N * log`<sub>`R`</sub>`N` characters, on average.__

            > __The running time of MSD in the worst case is linear.__

   * __3-way String Quicksort__

        To sort an array of strings, we 3-way partition them on their first character, then (recursively) sort the three resulting subarrays: the strings whose first character is less than the partitioning character, the strings whose first character is equal to the partitioning character (excluding their first character in the sort), and the strings whose first character is greater than the partitioning character.

        Three-way string quicksort divides the array into only three parts, so it involves more data movement than MSD string sort when the number of nonempty partitions is large because it has to do  a  series  of  3-way  partitions to get the effect of the multiway partition. On  the  other  hand, MSD   string   sort   can   create large numbers of (empty) sub-arrays,   whereas   3-way   string quicksort always has just three. Thus,  3-way  string  quicksort adapts  well  to  handling  equal keys,  keys  with  long  common prefixes,   keys  that  fall  into  a small range, and small arrays—all    situations    where    MSD string sort runs slowly.

        lso, like quicksort, 3-way string quicksort does not use extra space (other than the implicit stack to  support  recursion),  which  is  an  important  advantage  over  MSD  string  sort,  which requires space for both frequency counts and an auxiliary array.  


        It is worthwhile to consider various standard improvements to the implementation
        1. Use insertion sort for small subarrays
        2. As with any quicksort, it is generally worthwhile to shuffle the array beforehand or to use a random paritioning item by swapping the first item with a ran-dom one. The primary reason to do so is to protect against worst-case performance in the case that the array is already sorted or nearly sorted.

        > To sort an array of `N` random strings, 3-way string quicksort uses `~2N * lnN` character compares, on the average.

        Researchers  have studied  this  algorithm  in  depth  and  have  proved  that  no  algorithm  can  beat  3-way string quicksort (measured by number of character compares) by more than a constant factor,  under  very  general  assumptions.  To  appreciate  its  versatility,  note  that  3-way string quicksort has no direct dependencies on the size of the alphabet.


The number of characters in the alphabet is an important parameter when analyzing  string  sorts.  Though  we  focus  on  extended ASCII  strings (`R  = 256`),  we  will  also consider strings taken from much smaller alphabets (such as genomic sequences) and from much larger alphabets (such as the `65,536` - character Unicode alphabet that is an international standard for encoding natural languages).

### String Sorting Algorithms Comparison
![string-sort-algo-comparison](./images/string-sort-algo-comparison.png)


## Substring Search
__Substring search__: given a text string of length `N` and a pattern string of length `M`, find  an  occurrence  of  the  pattern  within  the  text.

While searching a pattern in a string, we compare each string's character against pattern. If a match is detected we move to the next character in patter. But when we reach a mismatch, the next compare will be against the first character of pattern. It means we start again. It is called backtracking.

Its worst-case running time is proportional to `M * N`.

### Knuth-Morris-Pratt substring search
The Knuth-Morris-Pratt (KMP) algorithm is an algorithm that is used to search for a substring (`W`), in a given string (`S`), in `O(m+n)` time (where `m` and `n` are the lengths of `W` and `S`).

The key idea used to achieve this time complexity is to minimize the amount of backtracking when a character of `W` does not match with that of `S`. This can only be done if we know two things:
1. Whether or not a proper prefix of `W` occurs more than once in `S` ​after at least one character has been correctly found; if it does, it can be skipped when resuming the process of matching after a mismatch.
2. Length of the proper prefix.

Before starting the actual algorithm, a one-dimensional array is initialized with the number of characters that can be skipped after a mismatch. `lps[i]` represents the number of characters that can be skipped when `W[i+1]` does not match with a character in `S`.

__`lsp`__ stands for longest proper prefix which is also suffix.

When a mismatch occurs, all the previous characters match correctly; ​this implies that if a prefix of `W` occurred in this set of matching characters, then that prefix is also a suffix of `W`.

In other words, `lps[i]` will represent the length of the longest proper prefix of `W`, which is also a proper suffix of `W` (considering `W` till the `i`th index only).

For the word `ACA` we have the following proper prefixes: ` `, `A`, `AC`, and the suffixes: ` `, `A`, `CA`, `ACA`. Thus, the longest proper prefix that is equal to the suffix is `A`.

![lps](./images/lps.gif)

#### Theorem
Knuth-Morris-Pratt substring search accesses no more than `m + n` characters to search for a pattern of length `m` in a text of length `n`.

Proof: `computeLPS()` runs in `O(m)` + `knuthMorrisPratt()` runs in `O(n)` time.


### Boyer-Moore substring search







---

#### [Video Lectures](https://youtube.com/playlist?list=PLsy0Ac_lM3PjZuZpsYJbF8AOZ-iq8qNid)

#### [Knuth-Morris-Pratt KMP String Matching Algorithm](https://www.youtube.com/watch?v=V5-7GzOfADQ)

#### [Read More about Knuth-Morris-Pratt Algorithms](https://towardsdatascience.com/pattern-search-with-the-knuth-morris-pratt-kmp-algorithm-8562407dba5b)

