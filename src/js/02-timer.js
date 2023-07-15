import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startButton: document.querySelector('button[data-start]'),
  picker: document.querySelector('input#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let intervalId = null;
let selectedDate = null;
let timeDiff = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < Date.now()) {
      Notify.failure('Будь ласка, виберіть дату в майбутньому');
      return;
    }
    refs.startButton.disabled = false;
    selectedDate = selectedDates;
  },
};

flatpickr(refs.picker, options);

refs.startButton.disabled = true;
refs.startButton.addEventListener('click', startTimer);

function startTimer() {
  refs.startButton.disabled = true;
  getTimeDiff();
}

function getTimeDiff() {
  intervalId = setInterval(() => {
    timeDiff = selectedDate - new Date();
    const convertedDate = convertMs(timeDiff);
    if (timeDiff <= 0) {
      clearInterval(intervalId);
    } else {
      updateClockView(convertedDate);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockView({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}