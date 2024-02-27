const $ = document;

const dayElem = $.querySelector(".days");
const hourElem = $.querySelector(".hours");
const minuteElem = $.querySelector(".minutes");
const secElem = $.querySelector(".seconds");

let targetTime = null;

const pushInit = () => {
    let day = Math.floor(targetTime / (60 * 60 * 24));
    let hours = Math.floor((targetTime % (60 * 60 * 24)) / (60 * 60));
    let minutes = Math.floor((targetTime % (60 * 60)) / 60);
    let seconds = Math.floor(targetTime % 60);

    dayElem.innerHTML = day.toString().padStart(2, 0);
    hourElem.innerHTML = hours.toString().padStart(2, 0);
    minuteElem.innerHTML = minutes.toString().padStart(2, 0);
    secElem.innerHTML = seconds.toString().padStart(2, 0);
};

window.localStorage?.getItem("remainingTime") && window.localStorage.getItem("remainingTime") > 0
    ? (targetTime = window.localStorage.getItem("remainingTime")) && pushInit()
    : (targetTime = 1209600);

const counter = setInterval(() => {
    let day = Math.floor(targetTime / (60 * 60 * 24));
    let hours = Math.floor((targetTime % (60 * 60 * 24)) / (60 * 60));
    let minutes = Math.floor((targetTime % (60 * 60)) / 60);
    let seconds = Math.floor(targetTime % 60);

    dayElem.innerHTML = day.toString().padStart(2, 0);
    hourElem.innerHTML = hours.toString().padStart(2, 0);
    minuteElem.innerHTML = minutes.toString().padStart(2, 0);
    secElem.innerHTML = seconds.toString().padStart(2, 0);
    targetTime--;
    window.localStorage.setItem("remainingTime", targetTime);

    if (targetTime < 0) {
        clearInterval(counter);
        window.localStorage?.removeItem("remainingTime");
    }
}, 1000);
