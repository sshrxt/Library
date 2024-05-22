const background = document.querySelector("body");
const mainContainer = document.querySelector(".main");

//---------------------------------toggle------------------------------
let mode = "light";
let toggleButton = document.querySelector("#toggle");
toggleButton.addEventListener("click", () => {
  toggle();
});

function toggle() {
  if (mode === "light") {
    console.log(mode);
    background.style.backgroundColor = "rgb(64, 9, 175)";
    mainContainer.style.color = "white";

    mode = "dark";
  } else {
    background.style.backgroundColor = "whitesmoke";
    mainContainer.style.color = "black";
    mode = "light";
  }
}
//---------------------------------toggle------------------------------

const dialog = document.getElementById("myDialog");

const showDialogBtn = document.getElementById("add-book");

const closeDialogBtn = document.getElementById("closeDialogBtn");


showDialogBtn.addEventListener("click", () => {
  dialog.showModal();
});


closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});
