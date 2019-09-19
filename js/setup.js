'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var eyesColor = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// открываем окно выбора персонажа
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// функция получения рандомного персонажа
var getRandomWizard = function (array) {
  var randomValue = [Math.floor(Math.random() * array.length)];

  return array[randomValue];
};


// Список персонажей
var wizards = [
  {
    name: getRandomWizard(WIZARD_NAMES) + ' ' + getRandomWizard(WIZARD_SURNAMES),
    coatColor: getRandomWizard(coatColor),
    eyesColor: getRandomWizard(eyesColor),
  },
  {
    name: getRandomWizard(WIZARD_NAMES) + ' ' + getRandomWizard(WIZARD_SURNAMES),
    coatColor: getRandomWizard(coatColor),
    eyesColor: getRandomWizard(eyesColor),
  },
  {
    name: getRandomWizard(WIZARD_NAMES) + ' ' + getRandomWizard(WIZARD_SURNAMES),
    coatColor: getRandomWizard(coatColor),
    eyesColor: getRandomWizard(eyesColor),
  },
  {
    name: getRandomWizard(WIZARD_NAMES) + ' ' + getRandomWizard(WIZARD_SURNAMES),
    coatColor: getRandomWizard(coatColor),
    eyesColor: getRandomWizard(eyesColor),
  },
];

// Функция получения рамдомных характеристик персонажей
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// показ персонажей на странице
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
