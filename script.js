const background = document.querySelector("body");
const mainContainer = document.querySelector(".main");
const bookContainer = document.querySelector(".book-container");
const myLibrary = [];

//-------------------------------book objects-------------------------
function Book(title, author, coverUrl, readStatus, genre) {
  this.title = title;
  this.author = author;
  this.coverUrl = coverUrl;
  this.readStatus = readStatus;
  this.genre = genre;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

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

//--------------------------------open-form-modal----------------------
const dialog = document.getElementById("myDialog");

const showDialogBtn = document.getElementById("add-book");

const closeDialogBtn = document.getElementById("closeDialogBtn");

showDialogBtn.addEventListener("click", () => {
   form.reset();
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});
//--------------------------------open-form-modal----------------------

//--------------------------------add-book-----------------------------
const form = document.getElementById("form-dialog");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const bookName = document.getElementById("book-name").value;
  const author = document.getElementById("author").value;
  const cover = document.getElementById("cover").value;
  const readStatus = document.getElementById("read").value;
  const genre = document.getElementById("genre").value;

  const newBook = new Book(bookName, author, cover, readStatus, genre);
  addBookToLibrary(newBook);
  dialog.close();
  updateDisplay();
});

function updateDisplay() {
    clearDisplay();
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.innerHTML = `
        <div class="book-cover" style="background-image: url(${book.coverUrl});">
        </div>
        <div class="book-info">
          <h2>${book.title}</h2>
          <div class="book-min-info">
            <p>${book.author}</p>
            <p>${book.genre}</p>
          </div>
          <button>${book.readStatus}</button>
        </div>
    `;
    
    bookContainer.appendChild(bookDiv);
  });
}

function clearDisplay() {
    const books = document.querySelectorAll(".book");
    books.forEach((book) => {
        bookContainer.removeChild(book);
    });
}
//-----------------------------add book ----------------------------------
