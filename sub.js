let btn = document.querySelector(".Start-Button");
let btnContainer = document.querySelector(".Button-Container"); 
let cards = document.querySelectorAll(".Card");
let Game_End = document.querySelector(".Game-End"); 
let cardContainerEl = document.getElementById("Card_Container");
let scoreCountEl = document.getElementById("Score-Count");
let doubleKnock =  'assets/sounds/click.mp3';
let cardMatchSound = 'assets/sounds/bling.mp3';
let cardNoMatchSound = 'assets/sounds/wrong_card.mp3';
let youWinSound = 'assets/sounds/game_complete.mp3';


let firstPick = [];
let secondPick = [];


  

// Convert NodeList to an array and store references to cards
let cardContainer = Array.from(cards);

function playSound(audioName){
  let audio = new Audio(audioName);
  audio.play(); 
}

function cardFlipAnimation(variable){
  variable.classList.toggle('is-flipped')

}

function emptyArray(){
  firstPick.length = 0;
  secondPick.length = 0; 
}

// Shuffles array using Fisher-Yates algorithm
function shuffle(arr) {
  var i = arr.length, j, temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;1
}

// Turns the NodeList into a clickable event
// function clickableEvent() {
//   for (let i = 0; i < cards.length; i++) {
//     cards[i].addEventListener("click", () => {
//       if (firstPick.length === 0) {
//         storeFirstCard(i);
//       } else {
//         storeSecondCard(i);
//       }
//       cardFlipAnimation(cards[i]);
//       playSound(doubleKnock);
//       matchCards(cards[i]); 
//       applyScore(pointsArr);
//       checkForWin();
//     });
//   }
// }

function cardClickHandler(index) {
  if (firstPick.length === 0) {
    storeFirstCard(index);
  } else {
    storeSecondCard(index);
  } if (firstPick.length === 0 && secondPick[0].length === 0) {
    return null
  } else {
  cardFlipAnimation(cards[index]);
  playSound(doubleKnock);
  matchCards(cards[index]); 
  applyScore(pointsArr);
  checkForWin();
  } 
};

function clickableEvent() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => {
      cardClickHandler(i);
    });
  }
};

// This button Shuffles the cards
btn.addEventListener("click", () => {
  cardContainerEl.style.display = "grid";
  shuffle(cardContainer);

  // Update the positions of cards in the DOM and apply styles
  cardContainer.forEach((card, index) => {
    
    card.dataset.id = index + 1;
    card.style.order = index + 1;
    btnContainer.style.display = "none"; 

  });
});

// create function that removes a specific item from an array 
function removFromArray(array, itemToRemove){ 
  let indexToRemove = array.indexOf(itemToRemove);

  if (indexToRemove !== -1) {
    array.splice(indexToRemove, 1);
  }
}


// Handles the matching logic of the cards
function matchCards(variable) {
  if (firstPick.length > 0 && secondPick.length > 0) {
    if (firstPick[0].getAttribute("id") === secondPick[0].getAttribute("id")) {
      console.log("We have a match!");
   
    
        
      firstPick.length = 0;
      secondPick.length = 0;
      console.log(cardContainer);

      // write code that changes the name of the class, but the class maintains the same properties of the .Card class 
      
      scoreCounter(true); 
      setTimeout(() => playSound(cardMatchSound), 390);

      
    } else {

      console.log("We don't have a match!! :(");
      setTimeout(()=> {
        cardFlipAnimation(firstPick[0])
        cardContainer.push(...firstPick);
        firstPick.length = 0;
      } , 750);
      setTimeout(()=> {
        cardFlipAnimation(secondPick[0])
        cardContainer.push(...secondPick);
        secondPick.length = 0;
      } , 750);
      
      
      console.log(cardContainer);
      setTimeout(() => playSound(cardNoMatchSound), 750); 
      scoreCounter(false); 
    }
  }
}

// Pushes the card data into an array and deletes the other data
function storeFirstCard(variable) {
  firstPick.push(cards[variable]);
  removFromArray(cardContainer, cards[variable])
  console.log(firstPick);
  console.log(cardContainer); 
}

function storeSecondCard(variable) {
  secondPick.push(cards[variable]);
  removFromArray(cardContainer, cards[variable])
console.log(secondPick);
console.log(cardContainer); 
}

function checkForWin(){
 if(cardContainer.length === 0){
 
  setTimeout(() => {
    Game_End.style.display = "block"; 
    playSound(youWinSound);
  }, 1000)
 }
}
let pointsArr = [];

function scoreCounter(variable){
  
 
  if (variable === true){
     pointsArr.push(1) 
  } else if (variable === false){
    pointsArr.push(-1);
  }
}

function applyScore(variable){

  let total = variable.reduce((total, value) => total + value, 0)

  let valueReturn =  total;

  scoreCountEl.textContent = valueReturn;
}; 



clickableEvent();



console.log(cardContainer); 