const boxes = document.querySelectorAll('.C');
const moves = document.querySelector('#moves');
const res = document.getElementById('result');
const start = document.getElementById('start');
const newGame = document.getElementById('newGame');
const timer=document.getElementById('timer');
const endGame = document.getElementById('endGame');
const okGame = document.getElementById('okGame');
const NGame = document.getElementById('NGame');
const moves1 = document.getElementById('moves1');
const timer1=document.getElementById('timer1');
const images = [
    './Photos/A_Card.png',
    './Photos/Ace_Card.png',
    './Photos/J_Card.png',
    './Photos/Jack_Card.png',
    './Photos/Joker1.png',
    './Photos/Joker2.png',
    './Photos/K_Card.png',
    './Photos/Queen_Card.png'
];
const oImages=[];
let firstCard, secondCard, timerInterval, imageArray, t1;
let matchedPairs=0;
const movesText = moves.textContent;
const timetext = timer.textContent;
const movesText1 = moves1.textContent;
const timetext1 = timer1.textContent;
let randomImages = shuffleArray([...images, ...images]);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  return array;
}

function startTimer() {
  if(timerInterval){
  clearInterval(timerInterval);
  }
  let seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    timer.textContent = timetext + seconds + " secs";
    t1=seconds;
  }, 1000);
}

function checkMatch(cnt) {
  if (firstCard.querySelector('img').src === secondCard.querySelector('img').src) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    firstCard = null;
    secondCard = null;
    matchedPairs++;
    if (matchedPairs === 8) {
        clearInterval(timerInterval);
        moves.textContent= movesText + cnt;
        moves1.textContent= movesText1 + cnt;
        timer1.textContent = timetext1 + t1 + " secs";
        res.textContent="Congratulations!! You matched all pairs."
        cnt=0;
        endGame.classList.add('active');
        document.body.classList.add('popupopen');
    }}
    else {
    setTimeout(() => {
      firstCard.querySelector('img').src = './Photos/Front_Side_Card.png';
      secondCard.querySelector('img').src = './Photos/Front_Side_Card.png';
      firstCard = null;
      secondCard = null;
    }, 500);
  }
  return cnt;
}

const startfunc=()=>{
  startTimer();
  let cnt=0;
  imageArray=randomImages
  boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      if (box === firstCard || box.classList.contains('matched')) return;
      
      const img = box.querySelector('img');
      img.src = imageArray[index];
  
      if (!firstCard) {
        firstCard = box;
        cnt++;
        moves.textContent= movesText + cnt;
      } else {
        secondCard = box;
        cnt++;
        moves.textContent= movesText + cnt;
        cnt=checkMatch(cnt);
      }
    });
  });
}

const newfunc=()=>{
  matchedPairs = 0;
  cnt=0;
  imageArray = shuffleArray(oImages);
  boxes.forEach((box, index) => {
    box.classList.remove('matched');
    const img = box.querySelector('img');
    img.src = imageArray[index];
  });
  clearInterval(timerInterval);
  res.textContent = "";
  moves.textContent = movesText;
  timer.textContent = timetext;
  randomImages = shuffleArray([...images, ...images]);
  startfunc();
}

boxes.forEach((box,index)=>{
    const img = box.querySelector('img');
    oImages[index]=img.src;
});

start.addEventListener('click',startfunc);
newGame.addEventListener('click',newfunc);

okGame.addEventListener('click', () => {
  endGame.classList.remove('active');
  document.body.classList.remove('popupopen');
});

NGame.addEventListener('click',()=>{
  newfunc();
  endGame.classList.remove('active');
  document.body.classList.remove('popupopen');
});
