import Verse from "./verse.js";

// create array of verses
// every time its changed add the whole array to the html file

let verses = [];

/**
 * adds a new verse object to the list
 * @param {string} book
 * @param {number} chapter
 * @param {number} start
 * @param {number} end
 * @param {string} text
 */
function createVerse(book, chapter, start, end, text) {
  verses[verses.length] = new Verse(book, chapter, start, end, text);
}

/**
 * clears the verse grid and fills it with the current array
 */
function updateYourVerses() {
  const verseGrid = document.querySelector(".verse-grid");
  verseGrid.innerHTML = ``; // clear
  // add all verses

  verses.forEach((element) => {
    let newVerse = document.createElement("section");
    newVerse.classList.add("verse-item");
    let content = `
    <div class="verse-ref"> ${element.getref()} </div>
    <div class="verse-text"> ${element.text}</div>
`;
    newVerse.innerHTML = content;
    verseGrid.prepend(newVerse);
  });

  if (verses.length == 0) {
    verseGrid.innerHTML = `<p>You currently have no verses, add one!</p>`;
  }
}

createVerse(
  "Romans",
  8,
  1,
  1,
  "Therefore there is now no condemnation for those in Christ Jesus."
);

createVerse(
  "Proverbs",
  3,
  5,
  6,
  "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him and he will make your paths straight."
);

updateYourVerses();

// dealing with adding verse event
///////////////////////////////////////////////////////////////////////////////////////
const submitButton = document.querySelector("#submitButton");
const form_status = document.querySelector(".add-form");

function sendError(message) {
  let new_error = document.createElement("p");
  new_error.classList.add("submit-error");
  new_error.innerHTML = message;
  form_status.insertBefore(new_error, submitButton);
}

submitButton.addEventListener(
  "click",
  (event) => {
    console.log(event);
    //delete current error message
    let err_msg_node = document.querySelector(".submit-error");
    if (err_msg_node != null) {
      form_status.removeChild(err_msg_node);
    }

    // send error message or add verse

    if (form_status.elements.Chapter.value == "") {
      sendError("Please enter a chapter");
    } else if (form_status.elements.Verse.value == "") {
      sendError("Please enter a verse"); //////////////////////// add message
    } else if (form_status.elements.Text.value == "") {
      sendError("Please enter text"); /////////////////////////////// add message
    } else if (
      form_status.elements.dash.value < form_status.elements.Verse.value &&
      form_status.elements.dash.value != ""
    ) {
      sendError("Error: verse greater than verse end"); ///////////////////////// add message
    } else {
      if (form_status.elements.dash.value == "") {
        form_status.elements.dash.value = form_status.elements.Verse.value; // set equal to same verse number if its not specified
      }
      createVerse(
        form_status.elements.Book.value, // book
        form_status.elements.Chapter.value, // chapter
        form_status.elements.Verse.value, // start verse
        form_status.elements.dash.value, // end verse
        form_status.elements.Text.value // text
      );
      updateYourVerses();
    }
  },
  false
);
