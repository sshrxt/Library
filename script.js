//-----------------------------global-declarations----------------------//
const background = document.querySelector("body");
const mainContainer = document.querySelector(".main");
const bookContainer = document.querySelector(".book-container");
const quoteContainer = document.querySelector(".quote-container");
const editForm = document.getElementById("form-dialog");
const dialog = document.getElementById("myDialog");
const showDialogBtn = document.getElementById("add-book");
const closeDialogBtn = document.getElementById("closeDialogBtn");

let myLibrary = [];
let doingWhat = "";

//-------------------------------book objects--------------------------//
function Book(title, author, coverUrl, readStatus, genre) {
  this.title = title;
  this.author = author;
  this.coverUrl = coverUrl;
  this.readStatus = readStatus;
  this.genre = genre;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  removeQuote("add");
}

function removeQuote(placeHolder) {
  if(placeHolder === "add") {
    if(myLibrary.length === 1) {
      bookContainer.removeChild(quoteContainer);
    }
  }
  else {
    if(myLibrary.length === 0) {
      bookContainer.appendChild(quoteContainer);
    }
  }
}

//--------------------------------open-form-modal------------------------//

showDialogBtn.addEventListener("click", () => {
  form.reset();
  doingWhat = "create";
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

//--------------------------------add-book--------------------------------//
const form = document.getElementById("form-dialog");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (doingWhat === "create") {
    const bookName = document.getElementById("book-name").value;
    const author = document.getElementById("author").value;
    const cover = document.getElementById("cover").value;
    const readStatus = document.getElementById("read").value;
    const genre = document.getElementById("genre").value;

    const newBook = new Book(bookName, author, cover, readStatus, genre);
    addBookToLibrary(newBook);
    dialog.close();
    updateDisplay(myLibrary);
  }
});

function updateDisplay(currLibrary) {
  clearDisplay();
  currLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");

    let buttonColor = "rgb(120, 201, 130)";

    if (book.readStatus === "Read") {
      buttonColor = "rgb(120, 201, 130)";
    } else if (book.readStatus === "Unread") {
      buttonColor = "rgb(201, 120, 139)";
    } else {
      buttonColor = "black";
    }

    bookDiv.classList.add("book");
    bookDiv.innerHTML = `
        <div class="book-cover" style="background-image: url(${book.coverUrl});">
        </div>
        <div class="book-info">
          <h2 class="title">${book.title}</h2>
          <div class="main-info">
            <div class="book-min-info">
              <p>${book.author}</p>
              <p>${book.genre}</p>
            </div>
            <div class="book-icon">
              <img src="imgs/pencil.svg" alt="edit" id="edit">
              <svg xmlns="http://www.w3.org/2000/svg" id="book-trash" viewBox="0 0 24 24" width="30px" height="30px" fill="white"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>
            </div>
          </div>
          <button id="reading-status" style="background-color: ${buttonColor};">${book.readStatus}</button>
        </div>
    `;

    bookContainer.appendChild(bookDiv);
  });

  addReadingListeners();
  addBookListeners();
}

function clearDisplay() {
  const books = document.querySelectorAll(".book");
  books.forEach((book) => {
    bookContainer.removeChild(book);
  });
}

//----------------------------change-read-status--------------------------//

function addReadingListeners() {
  const readBtns = document.querySelectorAll("#reading-status");

  readBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const bookContainer = button.closest(".book");
      const bookTitle = bookContainer.querySelector(".title");
      updateBook(bookTitle.textContent);
    });
  });
}

function updateBook(title) {
  myLibrary.forEach((book) => {
    if (book.title === title) {
      if (book.readStatus === "Read") {
        book.readStatus = "Unread";
      } else {
        book.readStatus = "Read";
      }
    }
  });
  updateDisplay(myLibrary);
}

//----------------------------trash a book card---------------------------//

function addBookListeners() {
  const trashes = document.querySelectorAll("#book-trash");

  trashes.forEach((trash) => {
    trash.addEventListener("click", () => {
      const bookContainer = trash.closest(".book");
      const bookTitle = bookContainer.querySelector(".title");
      const newLibrary = myLibrary.filter(
        (book) => book.title !== bookTitle.textContent
      );
      myLibrary = newLibrary;
      removeQuote("remove");
      updateDisplay(myLibrary);
    });
  });

  const pencils = document.querySelectorAll("#edit");
  pencils.forEach((edit) => {
    edit.addEventListener("click", () => {
      const bookContainer = edit.closest(".book");
      const bookTitle = bookContainer.querySelector(".title").textContent;
      const book = myLibrary.find((book) => book.title === bookTitle);
      doingWhat = book;

      const editDialog = document.getElementById("myDialog");

      editForm.elements["book-name"].value = book.title;
      editForm.elements["author"].value = book.author;
      editForm.elements["genre"].value = book.genre;
      editForm.elements["read"].value = book.readStatus;
      editForm.elements["cover"].value = book.coverUrl;

      dialog.showModal();

      editForm.onsubmit = (event) => {
        event.preventDefault();
        doingWhat.title = editForm.elements["book-name"].value;
        doingWhat.author = editForm.elements["author"].value;
        doingWhat.genre = editForm.elements["genre"].value;
        doingWhat.readStatus = editForm.elements["read"].value;
        doingWhat.coverUrl = editForm.elements["cover"].value;
        dialog.close();
        updateDisplay(myLibrary);
      };
    });
  });
}

//----------------------------filter-cards-------------------------------//
const filterRead = document.querySelector("#nav-read");
const filterGenre = document.querySelector("#nav-genre");
let readFilter = "All";
let genreFilter = "All";

filterRead.addEventListener("change", () => {
  readFilter = filterRead.value;
  filterValues(readFilter, genreFilter);
});

filterGenre.addEventListener("change", () => {
  genreFilter = filterGenre.value;
  filterValues(readFilter, genreFilter);
});

function filterValues(readFilter, genreFilter) {
  let newLibrary = [];
  if (readFilter === "All" && genreFilter === "All") {
    updateDisplay(myLibrary);
  } else if (readFilter === "All") {
    myLibrary.forEach((book) => {
      if (book.genre === genreFilter) {
        newLibrary.push(book);
      }
    });
    updateDisplay(newLibrary);
  } else if (genreFilter === "All") {
    myLibrary.forEach((book) => {
      if (book.readStatus === readFilter) {
        newLibrary.push(book);
      }
    });
    updateDisplay(newLibrary);
  } else {
    myLibrary.forEach((book) => {
      if (book.readStatus === readFilter && book.genre === genreFilter) {
        newLibrary.push(book);
      }
    });
    updateDisplay(newLibrary);
  }
}
