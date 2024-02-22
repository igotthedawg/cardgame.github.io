
let btn = document.getElementById("btn");
let cards = document.querySelectorAll(".Card");

firstPick = [];
secondPick = [];         




// Convert NodeList to an array and store references to cards
let cardContainer = Array.from(cards);

// Shuffles array using Fisher-Yates algorithm 
function shuffle(arr) {
  var i = arr.length, j, temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}


//Turns the NodeList into a clickable event
function clickableEvent(){
  debugger
  for(let i = 0;  i < cards.length; i++){
    cards[i].addEventListener("click", ()=>{
      if (firstPick.length === 0) {
        storeFirstCard(i);
      } else {
        storeSecondCard(i);
      }
   matchCards()
   
    })
  }
}
// This button Shuffles the cards 
btn.addEventListener("click", () => {
  shuffle(cardContainer);

  // Update the positions of cards in the DOM and apply styles
    cardContainer.forEach((card, index) => {
    card.dataset.id = index + 1;
    card.style.order = index + 1;
    btn.style.display = "none"; 
  
  });
  
});

// Handles the matching logic of the cards
function matchCards(){     
  if (firstPick.length > 0 && secondPick.length > 0) {       
if (firstPick[0] == secondPick[0]){
  alert("We have a match!"); 
  firstPick.length = 0; 
  secondPick.length =  0;  
} else if (firstPick[0] !== secondPick[0]) {
alert("We don't have a match!! :(")
cardContainer.push(firstPick); 
cardContainer.push(secondPick);
console.log(cardContainer); 
// needs to return  items  back to array if there isn't a match 
} 
}
  
}

// Pushes the card data into an array and deletes the other data 
function storeFirstCard(variable){
cardPos = cards[variable].getAttribute("id");
  firstPick.push(cardPos);
  cardContainer.pop();
  console.log(firstPick); 
  if(firstPick.length === 1){
    return; 
  }

}

function storeSecondCard(variable){
  cardPos = cards[variable].getAttribute("id");
  if (firstPick.length == 1){
    secondPick.push(cardPos);
    cardContainer.pop(); 
    console.log(secondPick); 
    return;
  }
}



clickableEvent()

