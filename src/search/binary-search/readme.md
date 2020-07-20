## Binary Search
Binary search is a textbook algorithm based on the idea to compare the target value to the middle element of the array.
* If the target value is equal to the middle element - we're done.
* If the target value is smaller - continue to search on the left.
* If the target value is larger - continue to search on the right.

![binary-and-linear-search](../../images/binary-and-linear-search.gif)

### Time Complexity
Recurrence relation: `T(n)=T(n/2)+1`

Derivation:
* 1st step: `T(n)=T(n/2) + 1`
* 2nd step: `T(n/2)=T(n/4) + 1 ……[ T(n/4)= T(n/2^2) ]`
* 3rd step: `T(n/4)=T(n/8) + 1 ……[ T(n/8)= T(n/2^3) ]`
* ...
* kth step: `T(n/2^k-1)=T(n/2^k) + 1*(k times)`

Adding all the equations we get, `T(n) = T(n/2^k) + k`. (__*__)

=> `n/2^k= 1` [So how many times we need to divide by 2 until we have only one element left]

=> `n=2^k`

=> `log n=k` [taken `log(base 2)` on both sides ]

Put `k= log` n in equation __*__.

=> `T(n) = T(1) + log n`

`T(n) = 1 + log n` [we know that `T(1) = 1` , because it’s a base condition as we are left with only one element in the array and that is the element to be searched so we return `1`]

=> `T(n) = O(log n)`
