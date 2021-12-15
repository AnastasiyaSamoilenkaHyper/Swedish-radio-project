import { startBtn } from "./Button.js";
import {
  createSpeechRecognition,
  createForm,
} from "./Speech_recognition_form.js";

let app = document.getElementById("app");
let container = document.getElementsByClassName("container")[0];

///////////////////FIRST PAGE////////////////////////////////

app.insertAdjacentHTML(
  "afterbegin",
  '<h1 class="start__h1">Choose your radio station</h1>'
);

startBtn.addEventListener("click", doPages);

function doPages() {
  document.getElementsByClassName("start__h1")[0].innerHTML = "welcome";
  startBtn.style.display = "none";
  app.style.margin = "1rem auto";
  if (startBtn.style.display == "none") {
    ///////////////////FETCH JSON//////////////////////////////
    fetch("https://api.sr.se/api/v2/channels?pagination=false&format=json")
      .then((response) => response.json())
      .then((data) => render(data));

    function render(data) {
      let channelNumber = doRandomNumber(data.channels.length);
      add_image(data, channelNumber);
      add_audio(data, channelNumber);
      createForm(container);

      /////////////Speech recognition/////////////////
      createSpeechRecognition(container);

      /////////////////////refactored functions/////////////////

      function add_image(data, i) {
        let img = document.createElement("img");
        img.src = data.channels[i].image.toString();
        document.getElementsByClassName("container")[0].append(img);
      }

      async function add_audio(data, i) {
        let audio = document.createElement("audio");
        audio.controls = true;

        let source = document.createElement("source");
        source.src = data.channels[i].liveaudio.url.toString();
        source.type = "audio/mpeg";
        audio.append(source);
        document.getElementsByClassName("container")[0].appendChild(audio);
      }
    }
  }

  function createNewPage() {
    fetch("https://api.sr.se/api/v2/channels?pagination=false&format=json")
      .then((response) => response.json())
      .then((data) => rendernext(data));

    function rendernext(data) {
      let channelNumber = doRandomNumber(data.channels.length);

      let img = document.querySelector("img");
      img.src = data.channels[channelNumber].image.toString();

      let source = document.querySelector("source");
      source.src = data.channels[channelNumber].liveaudio.url.toString();
      let audio = document.querySelector("audio");
      audio.load();
      audio.play();
    }
  }
}

function doRandomNumber(max) {
  return Math.floor(Math.random() * max);
}
