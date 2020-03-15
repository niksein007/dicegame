// the variable count stores the increment as the dice is rolled
let num = 0;
let points = 0;
let player1Points = 0;
let player2Points = 0;

//getting the input tags
let name1 = document.getElementById("name1");
let name2 = document.getElementById("name2");

//getting the error classes  in the span tag*
const error1 = document.getElementsByClassName("error")[0];
const error2 = document.getElementsByClassName("error")[1];

//getting the error message in the p tag
const errMsg = document.getElementById("errMsg");

//getting the p tag that holds the points
pointsHolder = document.getElementById("points");

// This variales targets the p tags that display the players
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");

const nameSection = document.getElementById("names");
const mainSection = document.getElementById("main");

//getting the p tag that holds the result
let result = document.getElementById("result");

// ThIS vartiableS gets the buttons in the html
const submit = document.getElementById("submit");
const rollDice = document.getElementById("rollDice");
const hold = document.getElementById("hold");
const reset = document.getElementById("reset");
const replay = document.getElementById("replay");



//add event listener to submit button to get names and checking the input values
submit.addEventListener("click", () => {
  if (name1.value === "" && name2.value === "") {
    error1.style.display = "inline";
    error2.style.display = "inline";
    name1.style.border = "1px solid red";
    name2.style.border = "1px solid red";
    errMsg.style.display = "block";
  } else if (name1.value === "" && name2.value !== "") {
    error1.style.display = "inline";
    name1.style.border = "1px solid red";
    errMsg.style.display = "block";

    error2.style.display = "none";
    name2.style.border = "1px solid black";
  } else if (name2.value === "" && name1.value !== "") {
    error2.style.display = "inline";
    name2.style.border = "1px solid red";
    errMsg.style.display = "block";

    error1.style.display = "none";
    name1.style.border = "1px solid black";
  } else {
    nameSection.style.display = "none";
    mainSection.style.display = "block";
    player1.textContent = name1.value;
    player2.textContent = name2.value;
    acitvePlayer()
  }
});

// adds event listener to the roll button
rollDice.addEventListener("click", () => {
  reset.style.display = "none";
  hold.style.display = "block";
  logic2();
  
  if ( points > 19 && player1.getAttribute("class") === "active") {
    result.textContent = `${name1.value} is the winner`;
    rollDice.style.display = "none";
    hold.style.display = "none";
    reset.style.display = "block";
    replay.style.display = "block";
    player2.setAttribute('class','loser')
    
  } else if ( points > 19 && player2.getAttribute("class") === "active") {
    result.textContent = `${name2.value} is the winner`;
    rollDice.style.display = "none";
    hold.style.display = "none";
    reset.style.display = "block";
    replay.style.display = "block";
    player1.setAttribute('class','loser')
    
  }
    
  

});

// adds event listener to the hold button
hold.addEventListener("click", () => {
  document
    .getElementsByTagName("img")[0]
    .setAttribute("src", `./img/background.png`);
  result.style.display = "block";
  if (player1.getAttribute("class") == "active") {
    player1.setAttribute("class", "");
    player2.setAttribute("class", "active");
    player1Points += points;
    points = 0;
    player1.textContent = `${name1.value}'s total points is ${player1Points} `;
    result.textContent = `${name2.value}'s Turn`;
    displayPoints();
    compare(player1Points, name1.value);
    
  } else if (player2.getAttribute("class") == "active") {
    player2.setAttribute("class", "");
    player1.setAttribute("class", "active");
    player2Points += points;
    points = 0;
    player2.textContent = `${name2.value}'s total points is ${player2Points} `;

    result.textContent = `${name1.value}'s Turn`;
    displayPoints();
    compare(player2Points, name2.value);
    
  }
});

// add event listener for the replay play again button
replay.addEventListener("click", () => {
  //calling the loser status to remove the styling for the loser
  loserStatus()
  // showing the active player to the users
acitvePlayer()

  replay.style.display = "none";
  reset.style.display = "block";
  rollDice.style.display = "block";
  points = 0;
  player1Points = 0;
  player2Points = 0;
  player1.textContent = `${name1.value}`;
  player2.textContent = `${name2.value}`;
  displayPoints();
  document
    .getElementsByTagName("img")[0]
    .setAttribute("src", `./img/background.png`);
});

// adds event listener to the reset button
reset.addEventListener("click", () => {
  location.reload(true);
});

// the method roll returns a random number between 1 and 6
const roll = () => {
  return Math.floor(Math.random() * 6 + 1);
};
// the method addMethod increases the value of count when called inside
// the logic method below
const addMethod = num => {
  points += num;
};
//The displayPoints method shows the number of points
const displayPoints = () => {
  pointsHolder.textContent = `Total point is ${points}`;
};

//The showDice method displays the image of a dice to the browser
const showDice = num => {
  document
    .getElementsByTagName("img")[0]
    .setAttribute("src", `./img/dice${num}.png`);
};
// The logic method runs specific functions depending on the returned
// value of the function roll. These functions are stated above.
const logic2 = () => {
  num = roll();
  showDice(num);

  if (num == 1 && player1.getAttribute("class") == "active") {
    player1.setAttribute("class", "");
    player2.setAttribute("class", "active");
    result.textContent = `${name2.value}'s Turn`;
    points = 0;
    displayPoints();
  } else if (num == 1 && player2.getAttribute("class") == "active") {
    player2.setAttribute("class", "");
    player1.setAttribute("class", "active");
    result.textContent = `${name1.value}'s Turn`;
    points = 0;
    displayPoints();
  } else {
    addMethod(num);
    displayPoints();
  }
};
// this method manipulates the style properties of the variables stated in it
const compare = (playerCount, player) => {
  if (playerCount >= 20) {
    result.textContent = `${player} is the winner`;
    rollDice.style.display = "none";
    hold.style.display = "none";
    reset.style.display = "block";
    replay.style.display = "block";
    winnerStatus()
 
  }
};

   //The if statement in the loserstatus function removes the styling for the loser
   // to enable replay

const  loserStatus = ()=>{
   if (player1.getAttribute("class") === "loser") {
    player1.setAttribute("class", "");
  } else {
    player2.setAttribute("class", "");
  }
}
////disabling the active class and activating the looser class used in the hold button 
//used only inside the compare function

const winnerStatus = ()=>{
  if (player1.getAttribute("class") === "active") {
    player1.setAttribute("class", "loser");
    player2.setAttribute("class", "active");
  } else {
    player2.setAttribute("class", "loser");
    player1.setAttribute("class", "active");
  }
  
}

// this method displays the current active player to the users
const acitvePlayer = () =>{
  if (player1.getAttribute('class') === 'active') {
    result.textContent =`${name1.value}'s Turn`
  } else if(player2.getAttribute('class') === 'active'){
    
   result.textContent =  `${name2.value}'s Turn`
}
}
