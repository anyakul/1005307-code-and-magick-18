'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GRAPH_HEIGHT = 150;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var maxTime = 0;

// функция показа окна статистики и тень к ней
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// функция показа сообщения о победителе
var renderWinner = function (ctx, x, y) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', x, y);
  ctx.fillText('Список результатов:', x, y + GAP * 2);
};

// Функция получения максимального элемента
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};


// Функция получения рандомного цвета
var getRandomColor = function () {
  var saturation = Math.floor(Math.random() * 101);

  return 'hsl(240, ' + saturation + '%, 50%)';
};

// Функция которая рисует элементы статистики
var renderBar = function (ctx, players, time, height, x, y) {
  ctx.fillStyle = '#000';
  ctx.fillText(players, x, CLOUD_HEIGHT - GAP * 2);
  ctx.fillText(time, x, y - GAP * 2);
  ctx.fillStyle = players === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomColor();
  ctx.fillRect(x, y, BAR_WIDTH, height);
};

// функция показа статистики
window.renderStatistics = function (ctx, players, times) {
  // - показ окна статистики и тень к ней
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // - показ сообщения о победителе
  renderWinner(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);

  // - показ статистики игроков
  maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barHeight = (GRAPH_HEIGHT * times[i]) / maxTime - GAP;
    var barCoordX = CLOUD_X + BAR_WIDTH + BAR_GAP * 2 * i;
    var barCoordY = CLOUD_Y + GAP * 8 + (GRAPH_HEIGHT - barHeight);

    renderBar(ctx, players[i], Math.ceil(times[i]), barHeight, barCoordX, barCoordY);
  }
};
