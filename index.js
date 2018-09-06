const chalk = require('chalk');
const char = '▦ ';
module.exports = function heatmap(data, colors, rows = data.length, columns = data[0].length) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const hex = data[i][j] && colors[data[i][j]] ? colors[data[i][j]] : '000000';
      process.stdout.write(chalk.hex(hex)(char));
    }
    process.stdout.write('\n');
  }
};

