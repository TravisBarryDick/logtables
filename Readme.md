# Log Tables

![Header](./ReadmeDiagrams/Header.jpg)

This project generates materials for computing log tables by hand.

## How to use it

### Generating new tables

To generate a new set of log tables, visit the website https://travisbarrydick.github.io/logtables/dist/. When you click the "Generate" button,
the page will become populated with unfilled and filled log tables. If you print
the webpage, each table will be printed on its own page to make them easier to
distribute to students. For cleaner handouts, disable headers and footers when
printing the tables. You can use the filled tables to check for errors.

There are a number of parameters you can configure to customize the tables:

- `Start`: the smallest value of log to compute.
- `Increment`: The spacing between computed function values.
- `Rows per table`: The number of rows in each table.
- `Number of tables`: The total number of tables to produce.
- `Degree`: The degree of the Taylor expansion used to approximate the function (higher degrees correspond to better approximations).
- `Precision`: The number of decimal places to show in each table entry.


### Filling in tables

Filling in the empty log tables only requires students to add and subtract
numbers. The value in each cell of the table should be computed by adding
the number directly above it, to the number above and to the right. Note that
some numbers in the table can be *negative*.

![Filling Tables](./ReadmeDiagrams/FillingTable.jpg)

Since the top row and right column are filled automatically, the students can
work their way from the top right to the bottom left filling entries as they go.
In fact, students only need to fill enough of the table to compute the entries
in the `f(x)` column, allowing them to skip some entries in the bottom right
corner.

### Reading the tables

Once the tables are complete, you can read off values of the log function using
the first two columns of each table. For example, using the table below, we see
that `log(1.5)` is approximately equal to `0.4057`, which is accurate to the 3rd
decimal place.

![Filled Table](./ReadmeDiagrams/FilledTable.jpg)

## How it works

There are two key ideas at work in the creation of log tables: Taylor
polynomials and the method of forward differences. Any analytic function,
including `log`, can be closely approximated in small neighborhoods using a
[Taylor polynomial](https://en.wikipedia.org/wiki/Taylor_series). Next, even
though polynomials are "easy" to evaluate (i.e., they only require additions and
multiplications to evaluate), computing values of polynomials at many regularly
spaced points would be extremely tedious. For example, the degree 3 Taylor
polynomial for `log` at `x = 1` is given by `p(x) = (x - 1) - (x-1)^2/2 +
(x-1)^3/3`. Evaluating this polynomial for all values of `x` in `1.0, 1.1, ...,
1.9` would be tedious and error prone. This brings us to the second key idea
behind the log tables, which is the method of *forward differences*, which is a
technique for evaluating polynomials at regularly spaced points using only
addition and following very simple steps. When we fill in the tables, we are
carrying out the forward differences algorithm to evaluate a Taylor polynomial
approximation to `log(x)` at a regularly spaced points.

Since Taylor polynomials are only accurate approximations of the log function
for small ranges of `x` values, each table in corresponds uses a Taylor
polynomial specifically crafted for the range of `x` values present on that
table.
