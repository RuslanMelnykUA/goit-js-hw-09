function colorPeacker() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
}

let intervalId = null;

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;

  intervalId = setInterval(colorPeacker, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  refs.startBtn.disabled = false;

  clearInterval(intervalId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

