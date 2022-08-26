import game from "./Game.js";

const btn = document.getElementById("start");
btn.addEventListener("click", () => {
  btn.setAttribute("disabled", true);
  game();
});

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-btn");

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
