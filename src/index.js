import {Array2D} from './Array2D.js';
import {DifferenceTable} from './DifferenceTable.js';

// Returns a degree p taylor series approximation to log(x) at x = a
function log_taylor_series(a, p) {
  return function(x) {
    let value = Math.log(a);
    let sign = 1;
    for (let i = 1; i <= p; i++) {
      value += sign * Math.pow(x - a, i) / (i * Math.pow(a, i))
      sign *= -1;
    }
    return value;
  }
}

function getValue(name) {
  return Number.parseFloat(document.getElementById(name).value);
}

window.generate = function() {
  const filled = document.getElementById("filled");
  const unfilled = document.getElementById("unfilled");

  // Remove any previously generated tables
  filled.innerHTML = '';
  unfilled.innerHTML = '';

  // Pull the parameters for the tables out of the HTML form
  const start = getValue("start");
  const dx = getValue("increment");
  const degree = getValue("degree");
  const precision = getValue("precision");
  const rowsPerTable = getValue("rows");
  const numTables = getValue("numTables");

  // Generate the tables and add them to the appropriate lists in the HTML
  for (let i = 0; i < numTables; i++) {
    const tableStart = start + dx*rowsPerTable*i;
    const tableEnd = tableStart + dx*rowsPerTable;
    const midpoint = (tableStart + tableEnd) / 2;
    const table = new DifferenceTable(log_taylor_series(midpoint, degree), tableStart, dx, rowsPerTable, degree+1, 2, precision);

    filled.appendChild(table.create_table(true));
    unfilled.appendChild(table.create_table(false));
  }
}
