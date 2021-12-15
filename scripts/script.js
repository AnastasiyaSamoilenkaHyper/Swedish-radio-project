import { startBtn } from "./Button.js";
import { doPages } from "./Page.js";

let app = document.getElementById("app");

//First page
app.insertAdjacentHTML(
  "afterbegin",
  '<h1 class="start__h1">Choose your radio station</h1>'
);

//Second page
startBtn.addEventListener("click", doPages);
