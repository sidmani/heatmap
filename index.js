const chalk = require('chalk');
const char = '▦ ';

function map(val, inMin, inMax, rgbMin, rgbMax) {
  const frac = (val - inMin) / (inMax - inMin);
  return rgbMin.map((v, idx) => Math.min(Math.max((rgbMax[idx] - v) * frac + v, rgbMax[idx]), v));
}

function hexToRGB(hex) {
  return /#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/.exec(hex).slice(1).map(v => parseInt(v, 16));;
}

module.exports = function heatmap(data, minColor, maxColor, minValue, maxValue) {
  const rows = data.length;
  const columns = data[0].length;

  const minColorRGB = hexToRGB(minColor);
  const maxColorRGB = hexToRGB(maxColor);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const value = data[i][j] || 0;
      const hex = map(value, minValue, maxValue, minColorRGB, maxColorRGB).map(x => x.toString(16)).join('');
      process.stdout.write(chalk.hex(hex)(char));
    }
    process.stdout.write('\n');
  }
};

