'use strict';

let player = 'circle';
let icon = document.querySelector('.kolecko');

const Play = (event) => {
  let square = event.target;
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
};

let box = document.querySelectorAll('.okynko');
box = addEventListener('click', Play);
