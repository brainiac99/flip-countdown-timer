"use strict";

const targetDate = new Date("2024-01-01T00:00:00");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const getElements = function (element) {
  const displayTop = element.querySelector(".display-top");
  const displayBottom = element.querySelector(".display-bottom");
  const overlayTop = element.querySelector(".overlay-top");
  const overlayBottom = element.querySelector(".overlay-bottom");
  const overlay = element.querySelector(".countdown-overlay");

  return {
    displayTop,
    displayBottom,
    overlayTop,
    overlayBottom,
    overlay,
  };
};

const calculateTime = function (date) {
  const time = Math.floor(date.getTime() - Date.now()) / 1000;

  const complete = Date.now() >= date.getTime();

  if (complete) return { complete, seconds: 0, minutes: 0, hours: 0, days: 0 };

  const days = Math.floor(time / 3600 / 24);
  const hours = Math.floor(time / 3600) % 24;
  const minutes = Math.floor(time / 60) - (hours * 60 + days * 24 * 60);
  const seconds = Math.floor(time) % 60;
  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const updateValue = function (element, value) {
  element.textContent = value;
};

const updateTime = function (el, timeValue) {
  const elementObj = getElements(el);
  if (parseInt(elementObj.overlayTop.textContent) === timeValue) return;

  elementObj.overlay.classList.add("flip");

  updateValue(elementObj.displayTop, timeValue);

  const endAnimation = function () {
    elementObj.overlay.classList.remove("flip");
  };

  elementObj.overlayTop.addEventListener("animationend", () => {
    updateValue(elementObj.overlayTop, timeValue);
    updateValue(elementObj.overlayBottom, timeValue);
  });
  elementObj.overlayBottom.addEventListener("animationend", () => {
    updateValue(elementObj.displayBottom, timeValue);
    endAnimation();
    elementObj.overlayBottom.removeEventListener("animationend", endAnimation);
  });
};

const updateAll = function () {
  const curTime = calculateTime(targetDate);

  updateTime(secondsEl, curTime.seconds);
  updateTime(minutesEl, curTime.minutes);
  updateTime(hoursEl, curTime.hours);
  updateTime(daysEl, curTime.days);

  return curTime.complete;
};

const countdownTimer = setInterval(() => {
  const isComplete = updateAll();

  if (isComplete) {
    clearInterval(countdownTimer);
  }
}, 1000);
