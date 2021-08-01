# String Algorithms
## String Sort
We consider two fundamental different approaches to string sorting:
1. The first approach examines the characters in the keys in a right-to-left order. Such methods are generally referred to as __least-significant-digit__ (__LSD__) string sorts.

    Use of the term _digit_ instead of character traces back to the application of the same basic meth-od to numbers of various types. Thinking of a string as a base-256 number, considering characters  from  right  to  left  amounts  to  considering  first  the  least  significant  digits.
    
    This approach is the method of choice for string-sorting applications where all the keys are the same length.

    > __LSD string sort stably sorts fixed-length strings.__

    > __LSD string sort uses `~7WN + 3WR` array accesses and extra  space  proportional  to `N + R`  to  sort `N`  items  whose  keys  are `W`-character strings taken from an `R`-character alphabet.__

    For typical applications, `R` is far smaller than `N`, so it implies that the total running time is proportional to `WN`. An input array of `N` strings that each have `W`-characters has a total of `WN` characters, so the running time of LSD string sort is linear in the size of the input.

2. The  second  approach  examines  the  characters  in  the  keys  in  a  left-to-right  order, working with the most significant character first.  These methods are generally referred to  as  __most-significant-digit__  (__MSD__)  string  sorts—we  will  consider  two  such  methods in this section.

   MSD string sorts are attractive because they can get a sorting job done without necessarily examining all of the input characters.  MSD string sorts are similar to quicksort, because they partition the array to be sorted into independent pieces such that  the  sort  is  completed  by  recursively  applying  the  same  method  to  the  subarrays. The  difference  is  that  MSD  string  sorts  use  just  the  first  character  of  the  sort  key  to do  the  partitioning,  while  quicksort  uses  comparisons  that  could  involve  examining the whole key.
   
   The first method that we consider creates a partition for each character value; the second always creates three partitions, for sort keys whose first character is less than, equal to, or greater than the partitioning key’s first character.

The number of characters in the alphabet is an important parameter when analyzing  string  sorts.  Though  we  focus  on  extended ASCII  strings (`R  = 256`),  we  will  also consider strings taken from much smaller alphabets (such as genomic sequences) and from much larger alphabets (such as the `65,536` - character Unicode alphabet that is an international standard for encoding natural languages).


---

#### [Video Lectures](https://youtube.com/playlist?list=PLsy0Ac_lM3PjZuZpsYJbF8AOZ-iq8qNid)
