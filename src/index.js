import {Array2D} from './Array2D.js';
import {DifferenceTable} from './DifferenceTable.js';

// Returns the degree 3 Taylor expansion of log(x) at x = a
function log_taylor_series(a) {
  const c0 = Math.log(a);
  const c1 = 1/a;
  const c2 = -1 / (a*a);
  const c3 = 2 / (a*a*a);
  return x => c0 + c1*(x - a) + c2/2*Math.pow(x-a, 2) + c3/6*Math.pow(x-a,3);
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
  const rowsPerTable = getValue("rows");
  const numTables = getValue("numTables");

  // Generate the tables and add them to the appropriate lists in the HTML
  for (let i = 0; i < numTables; i++) {
    const tableStart = start + dx*rowsPerTable*i;
    const tableEnd = tableStart + dx*rowsPerTable;
    const midpoint = (tableStart + tableEnd) / 2;
    const table = new DifferenceTable(log_taylor_series(midpoint), tableStart, dx, rowsPerTable, 4, 2, 4);

    filled.appendChild(table.create_table(true));
    unfilled.appendChild(table.create_table(false));
  }
}
