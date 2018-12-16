let order = [];
let playerOrder = [];
let flash;
let turn;
let isGood;
let isCompTurn;
let strict = false;
let sound = true;
let on = false;
let win;
let intervalId;

const turnCounter = document.querySelector('#turn'); // try to use getElementById
const topLeft = document.getElementById('top-left');
const topRight = document.querySelector('#top-right');
const bottomLeft = document.querySelector('#bottom-left');
const bottomRight = document.querySelector('#bottom-right');
const strictButton = document.querySelector('#strict');
const turnOnButton = document.querySelector('#on');
const startButton = document.querySelector('#start');

strictButton.addEventListener('change', e => {
  strict = strictButton.checked;
});

turnOnButton.addEventListener('change', e => {
  on = turnOnButton.checked;
  turnCounter.innerHTML = on ? '-' : '';
  if (!on) {
    // will work later on this
    clearInterval(intervalId);
    clearColor();
  }
});

startButton.addEventListener('click', e => {
  if (on || win) {
    play();
  }
});

function play() {
  reset();
  for (let i = 0; i < 20; i++) {
    order.push(
      Math.floor(Math.random() * 4) + 1
    );
  }
  isCompTurn = true;
  intervalId = setInterval(gameTurn, 800);
};

function gameTurn() {
  on = false; // disables all buttons;
  if (flash == turn) {
    // if computers turn is finished 
    clearInterval(intervalId);
    isCompTurn = false;
    clearColor();
    on = true;
  }

  if (isCompTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++
    }, 200);
  }
}

function reset() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  isGood = true;
};

function one() {
  if (sound) {
    let audio = document.getElementById('clip1');
    audio.play();
  }
  sound = true;
  topLeft.style.backgroundColor = 'lightgreen';
};

function two() {
  if (sound) {
    let audio = document.getElementById('clip2');
    audio.play();
  }
  sound = true;
  topRight.style.backgroundColor = 'tomato';
};

function three() {
  if (sound) {
    let audio = document.getElementById('clip3');
    audio.play();
  }
  sound = true;
  bottomLeft.style.backgroundColor = 'yellow';
};

function four() {
  if (sound) {
    let audio = document.getElementById('clip4');
    audio.play();
  }
  sound = true;
  bottomRight.style.backgroundColor = 'lightskyblue';
};

function clearColor() {
  topLeft.style.backgroundColor = 'darkgreen';
  topRight.style.backgroundColor = 'darkred';
  bottomLeft.style.backgroundColor = 'goldenrod';
  bottomRight.style.backgroundColor = 'darkblue';
};

topLeft.addEventListener('click', e => {
  if (on) {
    playerOrder.push(1);
    checkAnswer();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

topRight.addEventListener('click', e => {
  if (on) {
    playerOrder.push(2);
    checkAnswer();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomLeft.addEventListener('click', e => {
  if (on) {
    playerOrder.push(3);
    checkAnswer();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomRight.addEventListener('click', e => {
  if (on) {
    playerOrder.push(4);
    checkAnswer();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

function checkAnswer() {
  const playerOrderLast = playerOrder[playerOrder.length - 1];
  const orderLast = order[playerOrder.length -1];
  if (playerOrderLast !== orderLast) {
    isGood = false;
  }

  if (playerOrder.length == 20 && isGood) {
    winGame();
  }

  if (!isGood) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
     turnCounter.innerHTML = turn; // turn should be turnNumber
     clearColor();
     if (strict) {
       play();
     } else {
      //  repeat round
      isCompTurn = true;
      flash = 0;
      playerOrder = [];
      isGood = true;
      intervalId = setInterval(gameTurn, 800);
     }
    }, 800);
    sound = false;
  }
  if (turn == playerOrder.length && isGood && !win) {
    turn++;
    playerOrder = [];
    isCompTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
};

function flashColor() {
  topLeft.style.backgroundColor = 'lightgreen';
  topRight.style.backgroundColor = 'tomato';
  bottomLeft.style.backgroundColor = 'yellow';
  bottomRight.style.backgroundColor = 'lightskyblue';
};

function winGame() {
  flashColor();
  turnCounter.innerHTML = 'WIN!!!';
  on = false;
  win = true;
};
