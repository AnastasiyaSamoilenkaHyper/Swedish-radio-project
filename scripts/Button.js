export let startBtn = createBtn("btn__start", "start");

 function createBtn(idName, text) {
  let btn = document.createElement("button");
  btn.id = idName.toString();
  btn.innerHTML = text.toString();
  app.append(btn);
  return btn;
}