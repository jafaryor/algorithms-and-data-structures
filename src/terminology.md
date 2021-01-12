## Terminology:
* __online algorithm__ - is one that can process its input piece-by-piece in a serial fashion, i.e., in the order that the input is fed to the algorithm, without having the entire input available from the start.

* __in-place algorithm__ - is an algorithm which transforms input using no auxiliary data structure. The input is usually overwritten by the output as the algorithm executes. In-place algorithm updates input sequence only through replacement or swapping of elements.

    An algorithm which is not in-place is sometimes called __not-in-place__ or __out-of-place__.

* A sorting algorithm is __stable__ if it preserves the original order of elements with equal key values

* __adaptive sort__ - if it takes advantage of existing order in its input. It benefits from the presortedness in the input sequence – or a limited amount of disorder for various definitions of measures of disorder – and sorts faster.

* __subroutine__ is a sequence of program instructions that performs a specific task, packaged as a unit.

* __tail call__ is a subroutine call performed as the final action of a procedure. If a tail call might lead to the same subroutine being called again later in the call chain, the subroutine is said to be __tail-recursive__, which is a special case of recursion.

* __Heuristic__ is any approach to problem solving or self-discovery that employs a practical method that is not guaranteed to be optimal, perfect, or rational, but is nevertheless sufficient for reaching an immediate, short-term goal or approximation. Where finding an optimal solution is impossible or impractical, heuristic methods can be used to speed up the process of finding a satisfactory solution.

* __Greedy Algorithm__ is an algorithmic paradigm that follows the problem solving heuristic of making the locally optimal choice at each stage with the intent of finding a global optimum. In many problems, a greedy strategy does not usually produce an optimal solution, but nonetheless a greedy heuristic may yield locally optimal solutions that approximate a globally optimal solution in a reasonable amount of time.

* Example of __polynomial expressions__:
    * `5x^12 - 2x^6 + x^5 + 1` - polynomial of degree 12.
    * `x^4 - x^3 + x^2 - x + 1` - polynomial of degree 4.
    * `5x - 7` - polynomial of degree 1.

* An algorithm is said to be of __polynomial time__ if its running time is upper bounded by a polynomial expression in the size of the input for the algorithm

* In computational complexity theory, a problem is __NP-complete__ when:
    * A nondeterministic Turing machine can solve it in polynomial-time.
    * A deterministic Turing machine can solve it in large time complexity classes and can verify its solutions in polynomial time.
    * It can be used to simulate any other problem with similar solvability.
