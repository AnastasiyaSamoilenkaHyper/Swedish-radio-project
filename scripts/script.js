let app = document.getElementById("app");
let container = document.getElementsByClassName("container")[0];

///////////////////FIRST PAGE////////////////////////////////

let startBtn = createBtn("btn__start", "start");
startBtn.addEventListener("click", doPages);

function doPages() {
  startBtn.style.display = "none";
  if (startBtn.style.display == "none") {
    ///////////////////FETCH JSON//////////////////////////////
    fetch("https://api.sr.se/api/v2/channels?pagination=false&format=json")
      .then((response) => response.json())
      .then((data) => render(data));

    function render(data) {
      let channelNumber = doRandomNumber(data.channels.length);
      add_image(data, channelNumber);
      add_audio(data, channelNumber);
      createForm();


      /////////////Speach recognition/////////////////
      const searchForm = document.querySelector("#search-form");
      const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");
      const info = document.querySelector(".info");

      // The speech recognition interface lives on the browser’s window object
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

      if (SpeechRecognition) {
        console.log("Your Browser supports speech Recognition");

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        // recognition.lang = "sv-SE";

        searchForm.insertAdjacentHTML(
          "beforeend",
          '<button type="button"><i class="fas fa-microphone"></i></button>'
        );
        searchFormInput.style.paddingRight = "50px";

        const micBtn = searchForm.querySelector("button");
        const micIcon = micBtn.firstElementChild;

        micBtn.addEventListener("click", micBtnClick);
        function micBtnClick() {
          if (micIcon.classList.contains("fa-microphone")) {
            // Start Voice Recognition
            recognition.start(); // First time you have to allow access to mic!
          } else {
            recognition.stop();
          }
        }

        recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
        function startSpeechRecognition() {
          micIcon.classList.remove("fa-microphone");
          micIcon.classList.add("fa-microphone-slash");
          searchFormInput.focus();
          console.log("Voice activated, SPEAK");
        }

        recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
        function endSpeechRecognition() {
          micIcon.classList.remove("fa-microphone-slash");
          micIcon.classList.add("fa-microphone");
          searchFormInput.focus();
          console.log("Speech recognition service disconnected");
        }

        recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
        function resultOfSpeechRecognition(event) {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;

          if (transcript.toLowerCase().trim() === "stop recording") {
            recognition.stop();
          } else if (!searchFormInput.value) {
            searchFormInput.value = transcript;
          } else {
            if (transcript.toLowerCase().trim() === "go") {
              searchForm.submit();
            } else if (transcript.toLowerCase().trim() === "reset input") {
              searchFormInput.value = "";
            } else {
              searchFormInput.value = transcript;
            }
          }
          // searchFormInput.value = transcript;
          // searchFormInput.focus();
          // setTimeout(() => {
          //   searchForm.submit();
          // }, 500);
        }

        info.textContent =
          'Voice Commands: "stop recording", "reset input", "go", "give me a song"';
      } else {
        console.log("Your Browser does not support speech Recognition");
        info.textContent = "Your Browser does not support Speech Recognition";
      }
    }

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

function createBtn(idName, text) {
  let btn = document.createElement("button");
  btn.id = idName.toString();
  btn.innerHTML = text.toString();
  app.append(btn);
  return btn;
}

function doRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function createForm() {
  let form = document.createElement("form");
  form.action = "https://www.google.com/search";
  form.method = "get";
  form.target = "_blank";
  form.id = "search-form";

  //input
  let input = document.createElement("input");
  input.name = "q";
  input.type = "text";
  input.placeholder = "Search Google...";
  input.autocomplete = "off";
  input.autofocus = "true";
  // p
  let p = document.createElement("p");
  p.className = "info";

  container.appendChild(form);
  form.append(input);
  form.append(p);
}
