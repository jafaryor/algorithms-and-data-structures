# Optimization Methods
## Max Flow Problem
`/data-structures/flow-network`

## Symmetric positive-definite matrices and least-squares approximation
Symmetric positive-definite matrices are non-singular, and we can perform LU decomposition on them without having to worry about dividing by `0`.

> About how to to do LU decomposition see `/data-structures/matrix`.

#### Lemma
Any positive-definite matrix is nonsingular.

the `k`th __leading submatrix__ of `A`to be the matrix `A_k` consisting  of the intersection  of the first `k` rows and first `k` columns of `A`.

#### Lemma
If `A` is a symmetric positive-definite matrix, then every leading submatrix of `A` is symmetric and positive-definite.

### Application
One important application of symmetric positive-definite matrices arises in fitting curves to given sets of data points. Suppose that we are given a set of `m` data points:

`(x_1, y_1), (x_2, y_2), ..., (x_m, y_m)`.

where we know that the `y_i` are subject to measurement errors.  We would like to determine a function `F(x)` such that the approximation errors:

`Ƞ = F(x_i) - y_i` __(*)__

are small for `i = 1,2, ..., m`. The form of the function `F` depends on the problem at hand. Here, we assume that it has the form of a linearly weighted sum

`F(x) = ∑[j = 1 -> n](c_i * f_i(x))`

where the number of summands `n` and the specific basis functions `f_j` are chosen based on knowledge of the problem at hand.  A common choice is `f_i(x) = x`<sup>`j - 1`</sup>, which means that:

`F(x) = c_1 + c_2 * x + c_3 + x^2 + ... + c_n * x^(n - 1)`

is a polynomial of degree `n - 1` in `x`. Thus, given `m` data points `(x_1, y_1), (x_2, y_2), ..., (x_m, y_m)`, we wish to calculate `n` coefficients `c_1, c_2, ..., c_n` that minimize the approximation errors `Ƞ_1, Ƞ_2, ..., Ƞ_m`.

[This](http://staff.ustc.edu.cn/~csli/graduate/algorithms/book6/chap31.htm) article have more details on the topic.

Watch [this](https://www.youtube.com/watch?v=AmQcoopBUTk) video to find out more about the __Least Square Method__.

---

#### [Read for more details about Positive Definitive Matrix](http://slpl.cse.nsysu.edu.tw/chiaping/la/pdm.pdf).

#### [Design and Analysis of Algorithms by MIT](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-design-and-analysis-of-algorithms-spring-2015/)

#### [Introduction to Algorithms by Thomas H. Cormen, Charles E. Leiserson, and Ronald L. Rivest](http://staff.ustc.edu.cn/~csli/graduate/algorithms/book6/partvii.htm)
