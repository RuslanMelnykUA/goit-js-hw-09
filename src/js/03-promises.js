import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');
form.addEventListener('submit', onCreateClick);

function onCreateClick(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  let inputDelay = Number(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    inputDelay += Number(step.value);
  }
}