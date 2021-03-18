'use strict';

let btnRollDice = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let btnNew = document.querySelector('.btn--new');
let imgDice = document.querySelector('.dice');
let currentOne = document.getElementById('current--0');
let currentTwo = document.getElementById('current--1');
let currentScoreCero = document.getElementById('score--0');
let currentScoreOne = document.getElementById('score--1');
let players = document.querySelectorAll('.player');
let countScoreTotalCero = 0;
let countScoreTotalOne = 0;
let countCurrentCero = 0;
let counCurrentOne = 0;
let countTempCero = 0;
let countTempOne = 0;

imgDice.classList.add('hidden');

let randomeNumber = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

let toggleClassPlayers = function () {
  players.forEach(player => {
    player.classList.toggle('player--active');
  });
  countCurrentCero = 0;
  counCurrentOne = 0;
  currentOne.textContent = countCurrentCero;
  currentTwo.textContent = counCurrentOne;
};

btnRollDice.addEventListener('click', function () {
  let randomeValue = randomeNumber();
  imgDice.classList.remove('hidden');
  imgDice.setAttribute('src', `dice-${randomeValue}.png`);

  if (randomeValue === 1) {
    toggleClassPlayers();
  } else {
    players.forEach(player => {
      if (
        player.classList.contains('player--active') &&
        player.classList.contains('player--0')
      ) {
        countCurrentCero += randomeValue;
        currentOne.textContent = countCurrentCero;
      } else if (
        player.classList.contains('player--active') &&
        player.classList.contains('player--1')
      ) {
        counCurrentOne += randomeValue;
        currentTwo.textContent = counCurrentOne;
      }
    });
  }
});

btnHold.addEventListener('click', function () {
  players.forEach(player => {
    if (
      player.classList.contains('player--active') &&
      player.classList.contains('player--0')
    ) {
      countTempCero = countCurrentCero;
      countScoreTotalCero += countTempCero;
      currentScoreCero.textContent = countScoreTotalCero;
      if (currentScoreCero.textContent >= 100) {
        player.classList.add('player--winner');
        btnRollDice.disabled = true;
        btnHold.disabled = true;
      }
    } else if (
      player.classList.contains('player--active') &&
      player.classList.contains('player--1')
    ) {
      countTempOne = counCurrentOne;
      countScoreTotalOne += countTempOne;
      currentScoreOne.textContent = countScoreTotalOne;
      if (currentScoreOne.textContent >= 100) {
        player.classList.add('player--winner');
        btnRollDice.disabled = true;
        btnHold.disabled = true;
      }
    }
  });
  toggleClassPlayers();
});

btnNew.addEventListener('click', function () {
  imgDice.classList.add('hidden');
  btnRollDice.disabled = false;
  btnHold.disabled = false;
  currentScoreCero.textContent = 0;
  currentScoreOne.textContent = 0;
  players.forEach(player => player.classList.remove('player--winner'));
});
