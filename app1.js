//creating variables
let num = 0;
let sum = 0;
let store = 0;

//getting single player and two players button using class name
const singlePlayer = document.getElementsByClassName("singlePlayer")[0];
const twoPlayers = document.getElementsByClassName("twoPlayers")[0];

//getting the p tag that display the sum of dice rolled
const getSum = document.getElementById("sumOfDice");

// getting the p tag that displays the store value
const getStore = document.getElementById('store')

//getting the p tag that holds the result
const result = document.getElementById("result");

//getting the img tag
const bgImg = document.getElementsByTagName('img')[0]
// getting the header tag
header = document.getElementsByTagName('header')[0]

//getting the single player section
const single = document.getElementsByClassName('single')[0]

//getting the rollDice, hold,replay and reset button using id
const rollDice = document.getElementById("rollDice");
const hold = document.getElementById("hold");
const replay = document.getElementById("replay");
const reset = document.getElementById("reset");



//adding event listeners to single player button
singlePlayer.addEventListener("click", () => {
  singlePlayer.setAttribute("class", "active");
  twoPlayers.setAttribute("class", "deactivated");
  header.style.marginTop = 0 
  single.style.display = 'block'
});



//adding an eventlistener to the rollDice, hold  and replay button
rollDice.addEventListener("click", () => {
  replay.style.display = "none";
  hold.style.display = "block";
  result.textContent ='Result'
  logic1();
  compare();
});

hold.addEventListener("click", () => {
store += sum
sum = 0
bgImg.setAttribute('src','./img/background.png')
DisplaySum()
DisplayStore()
compare()
});

replay.addEventListener("click", () => {
  num = 0;
  sum = 0;
  store = 0
  bgImg.setAttribute('src','./img/background.png')
  DisplaySum();
  DisplayStore()
  result.textContent = "Result";
  rollDice.style.display = "block";
  replay.style.display ='none'
});

// adding event listener to the reset button
reset.addEventListener("click", () => {
    location.reload(true);

})

// the method roll returns a random number between 1 and 6
const roll = () => {
  return Math.floor(Math.random() * 6 + 1);
};
// the method addMethod increases the value of sum when called inside
// the logic method below
const addMethod = num => {
  sum += num;
};
//The displaySum and DisplayStore method displays the value of sum and store variables
const DisplaySum = () => {
  getSum.textContent = `Total points is ${sum}`;
};

const DisplayStore = () => {
  getStore.textContent =`Total points in store is ${store}`
};

//The showDice method displays the image of a dice to the browser
const showDice = num => {
  document
    .getElementsByTagName("img")[0]
    .setAttribute("src", `./img/dice${num}.png`);
};

// The logic method runs specific functions depending on the returned
// value of the function roll. These functions are stated above.
const logic1 = () => {
  num = roll();

  switch (num) {
    case 1:
      showDice(num);
     if (store === 0 ) {
        result.textContent = `
        You rolled a 1... 
        You Lose... 
        `;
  rollDice.style.display = "none";
  hold.style.display = 'none'
  replay.style.display = "block";
         
     } else{
      hold.style.display = 'none'
        result.textContent = `
        You rolled a 1... 
        Your current points have been cleared 
        You have a second chance
        `;

     }
     
      
      break;

    default:
      showDice(num);
      addMethod(num);
      DisplaySum();
      break;
  }
};

// to handle if sum is greater than 0r equals 20

const compare = () => {
  if (sum > 19 || store > 19) {
    result.textContent = `Congratulations you win!!!`;
    rollDice.style.display = "none";
    hold.style.display = 'none'
    replay.style.display = "block";
  }
};

