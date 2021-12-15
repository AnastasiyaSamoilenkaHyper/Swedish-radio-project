export function createSpeechRecognition(container) {
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
    recognition.lang = "en-US";

    createIcon("fas", "fa-microphone", "button", container);

    // container.innerHTML = `<button type="button"><img src='./microphone-solid.svg' class='fa-microphone'></button>`

    searchFormInput.style.paddingRight = "50px";

    const micBtn = container.querySelector(".button");
    const micIcon = micBtn.firstElementChild;

    recognition.start();

    micBtn.addEventListener("click", micBtnClick);
    function micBtnClick() {
      console.log("micBtn clicked");
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

      if (transcript.toLowerCase().trim() === "play") {
        document.querySelector("audio").play();
      }
      if (transcript.toLowerCase().trim() === "stop") {
        document.querySelector("audio").pause();
      }
      if (transcript.toLowerCase().trim() === "next") {
        createNewPage();
      }

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
      'Voice Commands: "next song", "play", "stop", "stop recording", "reset input", "go", "next song"';
  } else {
    console.log("Your Browser does not support speech Recognition");
    info.textContent = "Your Browser does not support Speech Recognition";
  }
}

function createIcon(className1, className2, className3, placeToAppend) {
  let btn = document.createElement("button");
  btn.className = className3;
  let img = document.createElement("img");
  img.src = "./microphone-solid.svg";
  // btn.innerHTML = "press to record/ stop recording";
  img.classList.add(className1);
  img.classList.add(className2);
  btn.append(img);
  placeToAppend.append(btn);
}

export function createForm(container) {
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
