## Number-Theoretic Algorithms
Here the “large  input” typically  means an input  containing  “large integers”  rather  than  an  input  containing  “many  integers”. Thus, we shall measure the size of an input in terms of the number of bits required to represent  that  input,  not  just  the number  of integers  in the input.   An algorithm with integer inputs `a_1, a_2, ..., a_k` is a polynomial-time algorithm.

In  most  of  this  book,  we  have  found  it  convenient  to  think  of  the  elementary  arithmetic  operations  (multiplications,  divisions,  or  computing  remainders)as primitive operations that take one unit of time. By counting the number of such arithmetic  operations  that  an algorithm  performs,  we have a basis  for  making  a reasonable estimate of the algorithm’s actual running time on a computer. Elementary operations can be time-consuming,  however,  when their inputs are large.  It thus becomes convenient to measure how many bit operations a number-theoretic algorithm requires. In this model, multiplying two `β`-bit integers by the ordinary method uses‚ `θ(β^2)` bit operations.

### Notations
The number  theory concerns  the  set `ℤ = {..., -2, -1, 0, 1, 2, ...}` of  integers  and  the  set `ℕ = {0, 1, 2, ...}` of natural numbers.

The notation `d | a` (read “d __divides__ a”) means that `a = k * d` for some integer `k`. Every integer divides `0`.

If `a > 0` and `d | a`, then `|d| ≤ |a|`. If `d | a`, then we also say that `a` is a __multiple__ of `d`. If `d` does not divide `a`, we write `d ⫮ a`.

If `d | a` and `d ≥ 0`, we say that `d` is a __divisor__ of `a`.  Note that `d | a` if and only if `-d | a`, so that no generality is lost by defining the divisors to be nonnegative, with  the  understanding  that  the  negative  of  any  divisor  of `a` also  divides `a`.

A divisor of a nonzero integer `a` is at least `1` but not greater than `|a|`.

Every positive integer `a` is divisible by the __trivial divisors__ `1` and `a`. The __nontrivial divisors__ of `a` are the factors of `a`. For example, the factors of `20` are `2`, `4`, `5`, and `10`.

An integer `a > 1` whose only divisors are the trivial divisors `1` and `a` is a __prime__ number or, more simply, a prime. Primes have many special properties and play a critical role in number theory.

> There are infinite number of primes.

An integer `a > 1` that is not prime is a __composite number__ or, more simply, a __composite__.

> We call the integer `1` a __unit__, and it is neither prime nor composite.  

> The integer `0` and all negative integers are neither prime nor composite.

#### Theorem (Division theorem)
For any integer `a` and any positive integer `n`, there exist unique integers `q` and `r` such that `0 ≤ r < n` and `a = q * n + r`.

The value `q = ⌊a/n⌋` is the __quotient__ of the division.  The value `r = a mod n` is the __remainder__ (or __residue__) of the division.  We have that `n | a` if and only if `a mod n = 0`.

We can partition the integers into `n` equivalence  classes according  to their remainders modulo `n`. The __equivalence class modulo `n`__ containing an integer `a` is `[a]`<sub>`n`</sub>` = {a + k * n: k ∈ ℤ}`.

For example, `[3]_7 = {..., -11, -4, 3, 10, 17, ...}` we can also denote this set by `[-4]_7` and `[10]_7`.

We can say that writing `a ∈ [b]_n` is the same as writing `a ≡ b (mod n)`.

The set of all such equivalence classes is `ℤ_n = {[a]_n: 0 ≤ a ≤ n-1}`. When you see the definition `ℤ_n = {0, 1, ..., n-1}`. you should read it as equivalent to equation above with the understanding that `0` represents `[0]_n`, `1` represents `[1]_n`, and so on; each class is represented by its smallest nonnegative element. You should keep the underlying equivalence classes in mind,however. For example, if we refer to `-1` as a member of `ℤ_n`, we are really referring to `[n-1]_n`, since `-1 ≡ n-1 (mod n)`.

If `d` is a divisor of `a` and `d` is also a divisor of `b`, then `d` is a __common divisor__ of `a` and `b`.

> Note that `1` is a common divisor of any two integers.

An important property of common divisors is that:

`d | a` and `d | b` implies `d | (a + b)` and `d | (a - b)`.

More generally, we have that

`d | a` and `d | b` implies `d | (ax + by)`.

for any integers `x` and `y`. Also, if `a | b`, then either `|a| ≤ |b|` or `b = 0`, which implies that

`a | b` and `b | a` implies `a = ±b`.

The greatest common divisor of  two  integers `a` and `b`,  not  both  zero,  is  the largest of the common divisors of `a` and `b`; we denote it by `gcd(a, b)`.

If `a` and `b` are both nonzero, then `gcd(a, b)` is an integer between `1` and `min(|a|, |b|)`.

> `gcd(0, 0) = 0`.

Properties of gcd:
* `gcd(a, b) = gcd(b, a)`
* `gcd(a, b) = gcd(-a, b)`
* `gcd(a, b) = gcd(|a|, |b|)`
* `gcd(a, 0) = |a|`
* `gcd(a, ka) = |a|` for any `k ∈ ℤ`
* `gcd(a, gcd(b,c)) = gcd(gcd(a,b), c).`

#### Theorem
If `a` and `b` are any integers, not both zero, then `gcd(a, b)` is the smallest positive element of the set `{ax + by: x, y ∈ ℤ}` of linear combinations of `a` and `b`.

#### Corollary
For any integers `a` and `b`, if `d | a` and `d | b`, then `d | gcd(a, b)`.

#### Corollary
For all integers `a` and `b` and any nonnegative integer `n`, `gcd(an, bn) = n * gcd(a, b)`.

#### Corollary
For all positive integers `n`, `a` , and `b`, if `n | ab` and `gcd(a, n)`,then `n | b`.

>  if `a | b` and `b ∣ c`, then `a ∣ c`.

Two integers `a` and `b` are __relatively prime__ if their only common divisor is `1`, that is, if `gcd(a, b) = 1`.

#### Theorem
For  any  integers `a`, `b`, and `p`, if  both `gcd(a, p) = 1` and `gcd(b, p) = 1`, then `gcd(ab, p) = 1`.

Integers `n_1, n_2, ..., n_k` are pairwise relatively prime if, whenever `i ≠ j`, we have `gcd(n_i, n_j) = 1`.

#### Theorem
For all primes `p` and all integers `a` and `b`, if `p | ab`, then `p | a` or `p | b` (or both).

#### Theorem (Unique factorization)
There is exactly one way to write any composite integer `a` as a product of the form

`a = p`<sub>`1`</sub><sup>`e`<sub>`1`</sub></sup>` * p`<sub>`2`</sub><sup>`e`<sub>`2`</sub></sup>` * ... * p`<sub>`r`</sub><sup>`e`<sub>`r`</sub></sup>

where the `p`<sub>`i`</sub> are prime, `p`<sub>`1`</sub>` < p`<sub>`2`</sub>` < ... < p`<sub>`r`</sub>,and the `e`<sub>`i`</sub> are positive integers.

### Greatest common devisor
We restrict ourselves in this section to nonnegative integers.  This restriction is justified duw to equation `gcd(a, b) = gcd(|a|, |b|)`.

In principle,  we can compute `gcd(a, b)` for positive integers `a` and `b` from the prime factorizations of `a` and `b`. Indeed, if

`a = p`<sub>`1`</sub><sup>`e`<sub>`1`</sub></sup>` * p`<sub>`2`</sub><sup>`e`<sub>`2`</sub></sup>` * ... * p`<sub>`r`</sub><sup>`e`<sub>`r`</sub></sup>

`b = p`<sub>`1`</sub><sup>`f`<sub>`1`</sub></sup>` * p`<sub>`2`</sub><sup>`f`<sub>`2`</sub></sup>` * ... * p`<sub>`r`</sub><sup>`f`<sub>`r`</sub></sup>

with zero exponents being used to make the set of primes `p`<sub>`1`</sub>` < p`<sub>`2`</sub>` < ... < p`<sub>`r`</sub> the same for both `a` and `b`, then

`gcd(a, b) = p`<sub>`1`</sub><sup>`min(e`<sub>`1`</sub>`, f`<sub>`1`</sub>`)`</sup>` * p`<sub>`2`</sub><sup>`min(e`<sub>`2`</sub>`, f`<sub>`2`</sub>`)`</sup>` * ... * p`<sub>`r`</sub><sup>`min(e`<sub>`r`</sub>`, f`<sub>`r`</sub>`)`</sup>

#### Theorem (GCD recursion theorem)
For any nonnegative integer `a` and any positive integer `b`,

__`gcd(a, b) = gcd(b, a mod b)`__

Example: `gcd(30, 21) = gcd(21, 9) = gcd(9, 3) = gcd(3, 0) = 3`.

### The running time of Euclid’s algorithm
We analyze  the worst-case running  time of `euclid()` as a function  of the size of `a` and `b`.  We assume with no loss of generality that `a > b ≥ 0`.  To justify this assumption, observe that if `b > a ≥ 0`, then `euclid(a, b)` immediately makes the recursive call `euclid(b, a)`.  That is, if the first argument is less than the second argument, `euclid()` spends one recursive call swapping its arguments and then proceeds.  Similarly, if `b = a > 0`, the procedure terminates after one recursive call, since `a mod b = 0`.

The overall running time of `euclid()` is proportional to the number of recursive calls it makes.

#### Theorem (Lam ́e’s theorem)
For any integer `k ≥ 1`, if `a > b ≥ 1` and `b < F`<sub>`k+1`</sub>, then the call `euclid(a, b)` makes fewer than `k` recursive calls.

Since `F`<sub>`k`</sub> is approximately `φ`<sup>`k`</sup>` / √5`, where `φ` is the golden ratio `(1 + √5)/2`, the number of recursive calls in `euclid()` is `O(lg b)`.

Therefore, if we call `euclid()` on two `β`-bit numbers,  then it performs `O(β)` arithmetic operations  and `O(β^3)` bit operations (assuming that multiplication and division of `β`-bit numbers take `O(β^2)` bit operations).


### Least Common Multiple (LCM)
Let `lcm(a, b)` to be the __least common multiple__ of the integers `a` and `b`, that is, the smallest nonnegative integer that is a multiple of `a` and `b`.

Since division of integers by zero is undefined, this definition has meaning only if `a` and `b` are both different from zero.

A multiple of a number is the product of that number and an integer. For example, `10` is a multiple of `5` because `5 × 2 = 10`, so `10` is divisible by `5` and `2`. Because `10` is the smallest positive integer that is divisible by both `5` and `2`, it is the least common multiple of `5` and `2`. By the same principle, `10` is the least common multiple of `−5` and `−2` as well.

We can calculate lcm if we know gcd using the following formula:

`lcm(a, b) = |a * b| / gcd(a, b)`


### Application
The number-theoretic algorithms are user in the following cases:
* Solving modular linear equations: `a * x ≡ b (mod n)`
* Encrypt and decrypt messages using RSA (public-key cryptosystem)

    With a public-key cryptosystem, we can encrypt messages sent between two communicating parties so that an eavesdropper who overhears the encrypted messages will not be able to decode them.

    The RSA public-key cryptosystem relies on the dramatic difference between the ease of finding large prime numbers and the difficulty of factoring the product of two large prime numbers.

* Primality testing (check if a number is a prime number)
* Integer factorization (decompose into a product of primes)

---

#### [Read More about LCM](https://en.wikipedia.org/wiki/Least_common_multiple)
