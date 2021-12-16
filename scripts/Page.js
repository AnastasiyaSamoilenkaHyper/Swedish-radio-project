import { startBtn } from "./Button.js";
import {
  createSpeechRecognition,
  createForm,
} from "./Speech_recognition_form.js";


let container = document.getElementsByClassName("container")[0];

export async function doPages() {
  document.getElementsByClassName("start__h1")[0].innerHTML = "welcome";
  startBtn.style.display = "none";
  app.style.margin = "1rem auto";

  
  if (startBtn.style.display == "none") {
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

 
}

export function doRandomNumber(max) {
  return Math.floor(Math.random() * max);
}