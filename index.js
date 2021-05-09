'use strict';

let player = 'circle';
let icon = document.querySelector('.kolecko');

const Play = (event) => {
  let square = event.target;
  // console.log(indexOf(square));
  if (square.className === 'okynko') {
    if (player === 'circle') {
      square.classList.add('board__field--circle');
      player = 'cross';
      icon.src = 'obrazky/cross.svg';
      square.disabled = true;
    } else if (player === 'cross') {
      square.classList.add('board__field--cross');
      player = 'circle';
      icon.src = 'obrazky/circle.svg';
      square.disabled = true;
    }
  }
  if (isWinningMove(event.target)) {
    setTimeout(() => {
      if (player === 'cross') {
        const conf = confirm(`Vítězem je kolečko.`);
        if (conf) {
          location.reload();
        }
      } else {
        const conf = confirm(`Vítězem je křížek.`);
        if (conf) {
          location.reload();
        }
      }
    }, 250);
  }
};

let box = document.querySelectorAll('.okynko');
box = addEventListener('click', Play);

const getSymbol = (field) => {
  if (field.classList.contains('board__field--circle')) {
    return 'circle';
  } else if (field.classList.contains('board__field--cross')) {
    return 'cross';
  }
};

const boardSize = 10;
const fields = document.querySelectorAll('.okynko');

// console.log(fields[31]);
// console.log(fields.indexOf(event.target));
// console.log(fields[31]);
// fields[31].style.backgroundColor = 'red';

const getField = (row, column) => {
  return fields[row * boardSize + column];
};

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};
