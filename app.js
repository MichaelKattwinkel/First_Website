import Verse from "./verse.js";

const verse1 = new Verse(
  "Proverbs",
  3,
  5,
  6,
  "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him and he will make your paths straight."
);

let content = `
    <div class="verse-ref"> ${verse1.getref()} </div>
    <div class="verse-text"> ${verse1.text}</div>
`;

console.log(verse1.getref());

const verseGrid = document.querySelector(".verse-grid");
let newVerse = document.createElement("section");
newVerse.classList.add("verse-item");
newVerse.innerHTML = content;
verseGrid.prepend(newVerse);
