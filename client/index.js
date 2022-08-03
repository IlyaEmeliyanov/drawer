
// Getting the canvas tools
const canvas = document.getElementById("canvas");
const drawBtn = document.getElementById("draw");
const eraseBtn = document.getElementById("erase");
const restartBtn = document.getElementById("restart");
const slider = document.getElementById("slider");
const colorPicker = document.getElementById("color-picker");

// Configs
let ctx = canvas.getContext("2d");
let coords = { x: 0, y: 0 };
let selectedColor = "#000";
let canvasState = "draw" | "erase" | "restart";
let sliderValue = slider.value;

// Mouse event listeners
canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", stop);
window.addEventListener("resize", resize);

// Tool event listeners
drawBtn.onclick = () => {
  drawBtn.classList.add("focus");
  eraseBtn.classList.remove("focus")
  restartBtn.classList.remove("focus")
  changeState("draw");
}
eraseBtn.onclick = () => {
  eraseBtn.classList.add("focus");
  drawBtn.classList.remove("focus");
  restartBtn.classList.remove("focus")
  changeState("erase");
}
restartBtn.onclick = () => {
  restartBtn.classList.add("focus");
  drawBtn.classList.remove("focus");
  eraseBtn.classList.remove("focus")
  changeState("restart");
}
slider.oninput = e => sliderValue = e.target.value;
colorPicker.oninput = e => selectedColor = e.target.value;

// Starts drawing
function start(event) {
  ctx = canvas.getContext("2d");
  ctx.lineCap = "round";
  ctx.lineWidth = sliderValue;
  ctx.strokeStyle = selectedColor;
  canvas.addEventListener("mousemove", draw);
  reposition(event);
}

// Draws line based on the provided configs
function draw(event) {
  const oldCoords = {x: coords.x, y: coords.y};
  
  ctx.beginPath();
  ctx.moveTo(coords.x, coords.y);
  reposition(event); // here you set the new coordinates (x,y)

  const newCoords = {x: coords.x, y: coords.y};

  ctx.bezierCurveTo(oldCoords.x, oldCoords.y, newCoords.x, newCoords.y, newCoords.x, newCoords.y)
  ctx.stroke();
}

// Stops drawing
function stop() {
  canvas.removeEventListener("mousemove", draw);
}

// Changes the coords
function reposition(event) {
  coords.x = event.clientX + 10;
  coords.y = event.clientY - canvas.offsetTop;
}

function changeState(state) {
  canvasState = state;
  switch (canvasState) {
    case "draw":
      console.log("%cDraw", "color: lime; font-weight: bold;")
      selectedColor = colorPicker.value;
      break;
    case "erase":
      console.log("%cErase", "color: lime; font-weight: bold;")
      selectedColor = "#fff";
      break;
    case "restart":
      console.log("%cRestart", "color: lime; font-weight: bold;")
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      break;
    default:
      console.log("%cError", "color: orange; font-weight: bold;")
  }
}

function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

resize();