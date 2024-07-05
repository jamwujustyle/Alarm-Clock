const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
const content = document.querySelector(".content");
const setAlarmButton = document.querySelector(".btn");

let alarmTime,
  isAlarmSet = false;
const ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
  let option = `<option value="${i < 10 ? "0" + i : i}">${
    i < 10 ? "0" + i : i
  }</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  let option = `<option value="${i < 10 ? "0" + i : i}">${
    i < 10 ? "0" + i : i
  }</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
  let ampm = i === 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let day_night = "AM";

  if (hours === 0) {
    hours = 12;
  } else if (hours >= 12) {
    if (hours > 12) hours -= 12;
    day_night = "PM";
  }

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  currentTime.textContent = `${hours}:${minutes}:${seconds} ${day_night}`;

  if (alarmTime === `${hours}:${minutes} ${day_night}`) {
    console.log(`Alarm ringing...`);
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

const setAlarm = () => {
  if (isAlarmSet) {
    ringtone.pause();
    alarmTime = "";
    content.classList.remove("disable");
    setAlarmButton.innerText = "Set Alarm";
    return (isAlarmSet = false);
  }
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  console.log(time);
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please select a valid time to set the alarm");
  }
  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  setAlarmButton.innerText = "Reset Alarm";
};

setAlarmButton.addEventListener("click", setAlarm);
