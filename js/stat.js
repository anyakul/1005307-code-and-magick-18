'use strict';

var Bar = {
  WIDTH: 40,
  GAP: 50
};

var Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10
};

var GRAPH_HEIGHT = 150;
var GAP = 10;

// функция показа окна статистики и тень к ней
var renderCloud = function (ctx, x, y) {
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#fff';
  ctx.fillRect(100, 10, 420, 270);
  ctx.shadowColor = 'rgba(0, 0, 0, 0)';
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
};

// функция показа сообщения о победителе
var renderWinner = function (ctx, x, y) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  printMessage(ctx, 'Ура вы победили!\nСписок результатов:', x, y);
};

// Функция переноса текста на другую строчку
var printMessage = function (ctx, message, x, y) {
  var lines = message.split('\n');
  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + 20 * i);
  }
};

// Функция получения рандомного цвета
var getRandomColor = function () {
  var saturation = Math.floor(Math.random() * 101);

  return 'hsl(240, ' + saturation + '%, 50%)';
};

// Функция которая рисует элементы статистики
var renderBar = function (ctx, players, time, height, x, y) {
  ctx.fillStyle = '#000';
  ctx.fillText(players, x, Cloud.HEIGHT - GAP * 2);
  ctx.fillText(time, x, y - GAP * 2);
  ctx.fillStyle = players === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomColor();
  ctx.fillRect(x, y, Bar.WIDTH, height);
};

// функция показа статистики
window.renderStatistics = function (ctx, players, times) {
  // - показ окна статистики и тень к ней
  renderCloud(ctx, Cloud.X + GAP, Cloud.Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, Cloud.X, Cloud.Y, '#fff');

  // - показ сообщения о победителе
  renderWinner(ctx, Cloud.X + GAP * 2, Cloud.Y + GAP * 2);
  printMessage(ctx, 'Ура вы победили! /n Список результатов');

  // - показ статистики игроков
  var maxTime = Math.max.apply(null, times);

  for (var i = 0; i < players.length; i++) {
    var time = Math.ceil(times[i]);
    var barHeight = Math.floor((GRAPH_HEIGHT * time) / maxTime - GAP);
    var barCoordX = Cloud.X + Bar.WIDTH + Bar.GAP * 2 * i;
    var barCoordY = Cloud.Y + GAP * 8 + (GRAPH_HEIGHT - barHeight);

    renderBar(ctx, players[i], time, barHeight, barCoordX, barCoordY);
  }
};
