import Verse from './verse.js';
import post from './post.js';
import get from './get.js';
import deleteRequest from './delete.js';

let USERNAME = null;

// ADD VERSE
/// ///////////////////////////////////////////////////////////////////////////////////////
const submitButton = document.querySelector('#submitButton');
const formStatus = document.querySelector('.add-form');

/**
 * Sends an error message above the submit button
 * @param {string} message
 */
const sendError = (message) => {
  const newError = document.createElement('p');
  newError.classList.add('submit-error'); // allows for seperate styling
  newError.innerHTML = message;
  formStatus.insertBefore(newError, submitButton);
};

submitButton.addEventListener(
  'click',
  () => {
    // delete current error message
    const errMsgNode = document.querySelector('.submit-error');
    if (errMsgNode != null) {
      formStatus.removeChild(errMsgNode);
    }

    // send error message or add verse
    if (formStatus.elements.Chapter.value == '') {
      sendError('Please enter a chapter');
    } else if (formStatus.elements.Verse.value == '') {
      sendError('Please enter a verse');
    } else if (formStatus.elements.Text.value == '') {
      sendError('Please enter text');
    } else if (
      formStatus.elements.dash.value < formStatus.elements.Verse.value
      && formStatus.elements.dash.value != ''
    ) {
      sendError('Error: verse start greater than verse end');
    } else {
      if (formStatus.elements.dash.value == '') {
        formStatus.elements.dash.value = formStatus.elements.Verse.value;
        // set verse start and end equal if not specified
      }
      const newVerse = new Verse(
        formStatus.elements.Book.value,
        formStatus.elements.Chapter.value,
        formStatus.elements.Verse.value,
        formStatus.elements.dash.value, // end verse
        formStatus.elements.Text.value,
      );
      post(USERNAME, newVerse).then(updateYourVerses()); // sends a post request to the server

      // clears certain elements in the form
      formStatus.elements.Verse.value = '';
      formStatus.elements.dash.value = '';
      formStatus.elements.Text.value = '';
    }
  },
  false,
);

// READ VERSES
/// ///////////////////////////////////////////////////////////////////////////////////////
updateYourVerses();

/**
 * clears the verse grid and fills it with the users verses
 */
function updateYourVerses() {
  get('http://localhost:7000/verses', USERNAME).then(((data) => {
    updateYourVerses2(data);
  }));
}

function updateYourVerses2(data) {
  const verses = data;
  const verseGrid = document.querySelector('.verse-grid');
  verseGrid.innerHTML = ''; // clear
  // add all verses

  verses.forEach((e) => {
    const newVerse = document.createElement('section');
    newVerse.classList.add('verse-item');
    const newClass = e._id;
    newVerse.classList.add(newClass); // used to link button and verse
    const content = `
    <div class="verse-ref"> ${`${e.book} ${e.chapter}:${e.start}${e.start == e.end ? '' : `-${e.end}`}`} </div>
    <div class="verse-text"> ${e.text}</div>
    <button name= ${newClass}><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg></button>
`; // svg for delete button

    newVerse.innerHTML = content;

    // delete button event listener
    const button = newVerse.querySelector('button');
    button.addEventListener('click', () => {
      deleteVerse(e._id);
    });

    verseGrid.prepend(newVerse);
  });

  if (verses.length == 0) {
    verseGrid.innerHTML = '<p>You currently have no verses, add one!</p>';
  }
}

// DELETE VERSE
/// /////////////////////////////////////////////////////////////////////////////////////////

function deleteVerse(id) {
  deleteRequest('http://localhost:7000/verses', id).then(updateYourVerses());
}

// LOG IN
/// /////////////////////////////////////////////////////////////////
const userButton = document.querySelector('.user');
userButton.addEventListener('click', () => {
  if (USERNAME == null) {
    // log in
    const login = document.createElement('div');
    login.classList.add('login');
    const content = `
    
    <label>Username:<label>
    <div><input></div>
    <button type=button id="loginButton">log in</button>
    `;
    login.innerHTML = content;
    document.querySelector('.dark-theme').prepend(login); // injects

    // log in button
    const loginButton = login.querySelector('#loginButton');
    loginButton.addEventListener('click', () => {
      USERNAME = login.querySelector('input').value;
      if (USERNAME == '') { USERNAME = null; }
      userButton.querySelector('p').innerHTML = (USERNAME == null) ? 'Log in' : USERNAME; // updates side bar
      login.remove(); // removes the prompt from the screen
      updateYourVerses();
    });
    document.addEventListener('keypress', (e) => {
      if (e.key == 'Enter') {
        USERNAME = login.querySelector('input').value;
        if (USERNAME == '') { USERNAME = null; }
        userButton.querySelector('p').innerHTML = (USERNAME == null) ? 'Log in' : USERNAME; // updates side bar
        login.remove(); // removes the prompt from the screen
        updateYourVerses();
      }
    });

    // click outside the login screen
    document.addEventListener('click', (event) => {
      if (!login.contains(event.target) && !userButton.contains(event.target)) {
        login.remove();
      }
    });
  } else if (document.querySelector('.logout') == null) {
    const logout = userButton.appendChild(document.createElement('button'));
    logout.classList.add('logout');
    logout.innerHTML = 'Logout';
    logout.addEventListener('click', () => {
      USERNAME = null;
      userButton.querySelector('p').innerHTML = 'Log In'; // updates side bar
      logout.remove();
      updateYourVerses();
    });

    // click outsite logout button
    document.addEventListener('click', (event) => {
      if (!logout.contains(event.target) && !userButton.contains(event.target)) {
        logout.remove();
      }
    });
  }
});
