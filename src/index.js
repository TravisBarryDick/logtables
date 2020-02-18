import {Array2D} from './Array2D.js'

// Returns the degree 3 Taylor expansion of log(x) at x = a
function log_taylor_series(a) {
  const c0 = Math.log(a);
  const c1 = 1/a;
  const c2 = -1 / (a*a);
  const c3 = 2 / (a*a*a);
  return x => c0 + c1*(x - a) + c2/2*Math.pow(x-a, 2) + c3/6*Math.pow(x-a,3);
}

// Returns the first row for the forward difference table of the function f
// starting at x with step size dx and order n forward differences.
function get_forward_differences(f, x, dx, n) {
  let table = new Array2D(n, n);
  table.fill(0);
  for (let i = 0; i < n; i++) {
    table.set(i, 0, f(x + i*dx))
  }
  for (let j = 1; j < n; j++) {
    for (let i = j; i < n; i++) {
      table.set(i, j, table.get(i, j-1) - table.get(i-1, j-1))
    }
  }
  console.log(table.toString(2))
  let result = []
  for (let i = 0; i < n; i++) {
    result.push(table.get(i,i));
  }
  return result;
}

// Given the top row of a forward difference tables, fills out the table to n
// rows.
function fill_table(row, n) {
  let table = new Array2D(n, row.length);
  // Copy top row of table
  for (let i = 0; i < row.length; i++) {
    table.set(0, i, row[i]);
  }
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < row.length; j++) {
      table.set(i, j, table.get(i-1, j) + table.get(i-1, j+1));
    }
    table.set(i, row.length - 1, table.get(i-1, row.length-1));
  }
  return table;
}
