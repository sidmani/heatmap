const chalk = require('chalk');
const char = '▦ ';
module.exports = function heatmap(data, colors, rows = data.length, columns = data[0].length) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      process.stdout.write(chalk.hex(colors[data[i][j]])(char));
    }
    process.stdout.write('\n');
  }
};

