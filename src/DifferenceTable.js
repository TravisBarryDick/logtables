import {Array2D} from './Array2D.js';

// Represents a forward difference table together with the parameters for that
// table. For convenience, it also stores a filled version of the table that can
// be used to verify student solutions.
export class DifferenceTable {
  constructor(f, x, dx, rows, cols, x_precision, entry_precision) {
    this.f = f;
    this.x = x;
    this.dx = dx;
    this.rows = rows;
    this.cols = cols;
    this.x_precision = x_precision;
    this.entry_precision = entry_precision

    let toprow = get_forward_differences(f, x, dx, cols);
    toprow = toprow.map(x => round_to_fixed(x, entry_precision));
    this.table = fill_table(toprow, rows);
  }

  create_table(filled) {
    let table = document.createElement('table');
    let row = table.insertRow();
    row.insertCell().innerHTML = "x";
    row.insertCell().innerHTML = "f(x)";
    for (let j = 1; j < this.cols; j++) {
      row.insertCell().innerHTML = `&Delta;${j}`;
    }
    for (let i = 0; i < this.rows; i++) {
      let row = table.insertRow();
      row.insertCell().innerHTML = (this.x + this.dx * i).toFixed(this.x_precision)
      for (let j = 0; j < this.cols; j++) {
        let cell = row.insertCell();
        if (filled || i == 0 || j == this.cols - 1) {
          cell.innerHTML = this.table.get(i,j).toFixed(this.entry_precision);
        } else {
          cell.innerHTML = "&nbsp;";
        }
      }
    }
    return table;
  }
}

function round_to_fixed(x, f) {
  return Number.parseFloat(x.toFixed(f));
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
