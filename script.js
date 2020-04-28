const gameContainer = document.getElementById("game");
const startBtn = document.querySelector("#startGame");
const tileContainer = document.querySelector("#tiles");
let card1 = null;

const ANIMALS = [
  "moose",
  "ostrich",
  "bear",
  "turtle",
  "racoon",
  "moose",
  "ostrich",
  "bear",
  "turtle",
  "racoon",
  "bunny",
  "bunny"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledAnimals = shuffle(ANIMALS);

/* this function loops over the array of colors
it creates a new div and gives it a class with the value of the color
it also adds an event listener for a click for each card
*/
function createDivsForAnimals(animalArray) {
  for (let animal of animalArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(animal, "not-flipped");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function createTileDivs(animalArray) {
  for (let animal of animalArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(animal);
    /* if(!tileContainer.classList.contains(animal)){
      tileContainer.append(newDiv);
    } */
    tileContainer.append(newDiv);
  }
}

let flippedCards = []
let score = 0;
let noClicks = false;

// TODO: Implement this function!

function handleCardClick(event) {
  if (noClicks === true) return
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  let clickedCard = event.target;

  clickedCard.classList.remove("not-flipped");
  flippedCards.push(clickedCard);

  if (flippedCards.length === 2) {
    noClicks = true;
    if (flippedCards[0].className === flippedCards[1].className) {
      score++;
      flippedCards = []
      noClicks = false;
    } else {
      setTimeout(function(){
        flippedCards[0].classList.add("not-flipped");
        flippedCards[1].classList.add("not-flipped");
        flippedCards = [];
        noClicks = false;
      }, 1000)
    }
  }

}

function startGame() {
  let header = document.querySelector("h1");
  header.classList.remove("notPlaying");
  startBtn.classList.add("hidden");
  tileContainer.classList.add("hidden");
  createDivsForAnimals(shuffledAnimals);
}

// when the DOM loads
startBtn.addEventListener('click', startGame);
createTileDivs(shuffledAnimals);