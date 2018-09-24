const chalk = require('chalk');
const defaultChar = '▦';

function map(val, inMin, inMax, rgbMin, rgbMax) {
  const frac = (val - inMin) / (inMax - inMin);
  return rgbMin.map((v, idx) => Math.round(v + (rgbMax[idx] - v) * frac));
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
      const point = data[i][j] || 0;
      let color = point.color ? hexToRGB(point.color) : maxColorRGB;
      const hex = map(point.value || point, minValue, point.max || maxValue, minColorRGB, color)
        .map(x => x.toString(16))
        .join('');
      const char = point.char || defaultChar;
      process.stdout.write(chalk`{hex('${hex}') ${char} }`);
    }
    process.stdout.write('\n');
  }
};

