const timeDisplay = document.getElementById("time");
const status = document.getElementById("status");
const startBtn = document.getElementById("startShift");
const endBtn = document.getElementById("endShift");
let timers = [];
let shiftActive = false;

function updateClock() {
  const now = new Date();
  timeDisplay.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

function notify(message) {
  if (Notification.permission === "granted") new Notification(message);
}

function scheduleShiftReminders() {
  const notifications = [
    { offset: 0, message: "🚀 Shift started — focus & hydrate!" },
    { offset: 60, message: "💧 Hydration check!" },
    { offset: 120, message: "🧍 Stand, stretch, reset posture." },
    { offset: 180, message: "🍎 Light healthy snack break." },
    { offset: 240, message: "⚙️ Mid-shift energy boost!" },
    { offset: 360, message: "💧 Water break — keep it up!" },
    { offset: 480, message: "🏁 Almost done — final push!" },
    { offset: 660, message: "🌅 Great work! Wind down & rest soon." }
  ];
  notifications.forEach(n => {
    const t = setTimeout(() => notify(n.message), n.offset * 60 * 1000);
    timers.push(t);
  });
}

function startShift() {
  shiftActive = true;
  status.textContent = "🟢 Shift Active (6 PM – 5 AM)";
  startBtn.style.display = "none";
  endBtn.style.display = "block";
  scheduleShiftReminders();
  notify("✅ Shift reminders activated!");
}

function endShift() {
  shiftActive = false;
  status.textContent = "🔴 Shift Ended";
  startBtn.style.display = "block";
  endBtn.style.display = "none";
  timers.forEach(clearTimeout);
  timers = [];
  notify("🛏 Shift ended — time to recharge.");
}

startBtn.addEventListener("click", () => {
  Notification.requestPermission().then(p => p === "granted" && startShift());
});
endBtn.addEventListener("click", endShift);

// Auto-detect current time
function autoDetectShift() {
  const now = new Date();
  const hours = now.getHours();
  const mins = now.getMinutes();
  const total = hours * 60 + mins;

  const inShift = total >= 1080 || total < 300;
  if (inShift && !shiftActive) {
    Notification.requestPermission().then(p => p === "granted" && startShift());
  }
  if (!inShift && shiftActive) {
    endShift();
  }
}
setInterval(autoDetectShift, 60000);
autoDetectShift();