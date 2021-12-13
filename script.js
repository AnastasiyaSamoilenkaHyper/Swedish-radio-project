let app = document.getElementById("app");

fetch("https://api.sr.se/api/v2/channels?format=json")
  .then((response) => response.json())
  .then((data) => render(data));

function render(data) {
  // console.log(data.channels[2].id);
  add_logo(data);
}

function add_logo(data) {


  for (let i = 0; i < data.channels.length; i++) {
    let img = document.createElement("img");
    img.src = data.channels[i].image.toString();
    document.getElementById("app").appendChild(img);

    //add audio
    // add_audio(data)
    let audio = document.createElement("audio");
    // img.addEventListener('onclick', audio.play());
    audio.controls = true;
    // audio.play();
    let source = document.createElement("source")
    source.src = data.channels[i].liveaudio.url.toString();
    source.type = "audio/mpeg";
    audio.append(source);
    document.getElementById("app").appendChild(audio);

    console.log(data.channels[i].liveaudio.url);

    // let audio = new Audio(data.channels[i].liveaudio.url.toString());
    // audio.play();
    // audio.pause();
  }
}

async function add_audio(data, i) {
  // let audio = document.createElement('audio');
  // audio.src = data.channels[i].liveaudio.url.toString();
  // document.getElementById('app').appendChild(audio);
  // console.log(data.channels[i].liveaudio.url)
}
