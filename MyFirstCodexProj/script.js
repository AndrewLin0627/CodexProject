let today = new Date();
let targetDate = new Date("2026-12-31");
let timeDiff = targetDate - today;
let daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
document.querySelector("#memo").textContent = "距離到三趨還有" + daysLeft + "天";