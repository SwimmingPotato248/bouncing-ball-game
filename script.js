import game from "./Game.js";

const btn = document.getElementById("start");
btn.addEventListener("click", () => {
  btn.setAttribute("disabled", true);
  game();
});
