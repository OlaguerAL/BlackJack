// console.log("hello world!")


//  Age Checker
// let age = 21
// let legalAge = 20

// if (age <= legalAge) {
//     console.log(`Must be at least ${legalAge} to play the game.`)
// } else {
//     console.log(`Welcome! Let's play BlackJack.`)
// }

 
// // Game Logic

// let firstCard = 10
// let secondCard = 11
// let sum = firstCard + secondCard
// let hasBlackJack = false
// let isAlive = true
// let hasLost = false

// //  if condition
// if (sum < 21) {
//     message = "Do you want to draw a new card? 😊"
// } else if (sum === 21) {
//     message = "BlackJack! 🥳"
//     hasBlackJack = true 
// } else {
//     message = "Busted! 😭"
//     hasLost = true
//     isAlive = false
// }

// --------------------- Variables
let dealerSum = 0
let yourSum = 0

let dealerAceCount = 0
let yourAceCount = 0

let bet = ""
let win = yourMoney + bet
let lose = yourMoney - bet

var yourMoney = 1000

var hidden;
var deck;

var canHit = true

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

// ---------------- Build Deck
buildDeck = () => {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suits = ["C", "D", "H", "S"];
    deck = [];

     for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + suits[i]);
        }
     }
    //  console.log(deck)
}

// --------------- Shuffle Deck
shuffleDeck = () => {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

// --------------- Start game
dealerFirstCard = () => {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "images/cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg)
}

startGame = () => {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    dealerFirstCard();
    // console.log(hidden)
    // console.log(dealerSum)

// --------------- Dealer Draws Cards when is Sum < 17

    // if (dealerSum < 17) {
    //     let cardImg = document.createElement("img");
    //     let card = deck.pop();
    //     cardImg.src = "images/cards/" + card + ".png";
    //     dealerSum += getValue(card);
    //     dealerAceCount += checkAce(card);
    //     document.getElementById("dealer-cards").append(cardImg)

    // }
    // console.log(dealerSum)
    // if (dealerSum < 17) {
    //     let cardImg = document.createElement("img");
    //     let card = deck.pop();
    //     cardImg.src = "images/cards/" + card + ".png";
    //     dealerSum += getValue(card);
    //     dealerAceCount += checkAce(card);
    //     document.getElementById("dealer-cards").append(cardImg)

    // }
    // console.log(dealerSum)

    for (let i = 0; i < 2; i ++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "images/cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg)
    }

    let message = "";
    if (yourSum == 21) {
        message = "BlackJack! You win.";
    }
    else {
        message = "Busted!"
    }

    console.log(yourSum)
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);

}

// --------------------- Hit
hit = () => {
    if (!canHit) {
        return;
    }
    let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "images/cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg)
    
    yourSum = reduceAce(yourSum, yourAceCount);
    dealerSum = reduceAce(dealerSum, dealerAceCount);

    let message = "";
    if (reduceAce(yourSum, yourAceCount) > 21) {
    }
    
    if (yourSum == 21) {
        message = "BlackJack! You Win!";
    }
    else if (yourSum > 21) {
        canHit = false; 
        message = "Busted!"
    } 

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
     
}

stand = () => {
    canHit = false;
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "images/cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg)

    }
    console.log(dealerSum)
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    document.getElementById("hidden").src = "images/cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21 ) {
        message = "What an Idiot! 🤡"; // L
    }
    else if (yourSum == 21) {
        message = "🤬🤬";
    }
    else if (dealerSum > 21) {
        message = "You got Lucky! 😤"; // W
    }
    else if (yourSum == dealerSum) { //Tie!
        message = "God saved you! 🥱";
    }
    else if (yourSum > dealerSum) { // W
        message = "Not gonna happen next time. 🫣";
    }
    else if (yourSum < dealerSum) { // L
        message = "Stick to Solitaire Kid! 🤪"
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}

getValue = (card) => {
    let data  = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value)
}

checkAce = (card) => {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

reduceAce = (playerSum, playerAceCount) => {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 10;
    }
    return playerSum;
}

playAgain = () => {
    location.reload()
}

deal = () => {

}