// the variable count stores the increment as the dice is rolled
let num = 0;
let count = 0;
let player1Count = 0;
let player2Count = 0;
let result = document.getElementById("result");
// ThIS vartiableS gets the buttons in the html
let name1 = document.getElementById("name1");
let name2 = document.getElementById("name2");


const nameSection = document.getElementById("names");
const submit = document.getElementById("submit");
const mainSection = document.getElementById("main");
const rollButton = document.getElementById("button");
const holdButton = document.getElementById("hold");
const resetButton = document.getElementById("reset");
const replay = document.getElementById("replay");
// This variables gets the players in the html
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");

//this method sets the count to anyplayer selected
// const assignCount = (player)=>{
//        return player = count;
// }
// console.log(assignCount(1));

// the method roll returns a random number between 1 and 6
const roll = () => {
    return Math.floor((Math.random() * 6) + 1)
}
// the method addMethod increases the value of count when called inside
// the logic method below
const addMethod = (num) => {
    count += num;
}
//The showCount and resetShowCount  method shows/unshows the value of count on the browser
const showCount = () => {
    document.getElementById("show-count").textContent = `The total count is ${count}`;
};

const resetShowCount = () => {
    document.getElementById("show-count").textContent = 0;
};





//The showDice method displays the image of a dice to the browser
const showDice = (num) => {
    document.getElementsByTagName("img")[0].setAttribute("src", `./img/dice${num}.png`);
}
// The logic method runs specific functions depending on the returned
// value of the function roll. These functions are stated above.
//this method was used for single player
const logic1 = () => {
    num = roll();

    switch (num) {
        case 1:
            showDice(num);
            result.textContent = `
            You rolled a 1... 
            You Lose... 
            `
            button.style.visibility = "hidden";
            resetButton.style.visibility = "visible";
            break;

        default:
            showDice(num);
            addMethod(num);
            showCount();
            break;
    }
}

// for two players
const logic2 = () => {
    num = roll();
    showDice(num);

    if ((num == 1) && (player1.getAttribute("class") == "active")) {
        player1.setAttribute("class","");
        player2.setAttribute("class","active");
        result.textContent = `${name2.value}'s Turn`;
        count = 0;
        showCount();
    } else if ((num == 1) && (player2.getAttribute("class") == "active")) {
        player2.setAttribute("class","");
        player1.setAttribute("class","active");
        result.textContent = `${name1.value}'s Turn`;
        count = 0;
        showCount();
    }else{
        addMethod(num);
        showCount();
    }
  
    
}
// this method manipulates the style properties of the variables stated in it
const reactions = (playerCount,player)=>{
   if( playerCount >= 20 ) {
        result.textContent = `${player} is the winner`;
        rollButton.style.visibility = "hidden";
        holdButton.style.visibility = "hidden";
        resetButton.style.visibility = "visible";
        replay.style.visibility = "visible";
}

}
//add event listener to submit button to get names
submit.addEventListener("click",()=>{
    nameSection.style.display = "none";
    mainSection.style.display = "block";
    console.log(name1.value);
    console.log(name2.value);
    player1.textContent = name1.value;
    player2.textContent = name2.value;
})

// adds event listener to the roll button
rollButton.addEventListener("click", () => {
    resetButton.style.visibility = "hidden";
    replay.style.visibility = "hidden";
    logic2();
    const player  = document.getElementsByClassName("active")[0].textContent;
    if (count >= 20) {
        result.textContent = `${player} is the winner`;
        rollButton.style.visibility = "hidden";
        holdButton.style.visibility = "hidden";
        resetButton.style.visibility = "visible";
        replay.style.visibility = "visible";

    }
    //the code below is for a single player
    // if (count >= 20) {
    //     document.getElementById("result").textContent = "you win"
    //     button.style.visibility = "hidden";
    //     resetButton.style.visibility = "visible";
    // }

    
})



// adds event listener to the hold button
holdButton.addEventListener("click",()=>{
    document.getElementsByTagName("img")[0].setAttribute("src", `./img/background.png`);
    if (player1.getAttribute("class") == "active" ) {

    player1.setAttribute("class","");
    player2.setAttribute("class","active");
    player1Count  = player1Count + count;
    count = 0;
    player1.textContent = `${name1.value}'s total count is ${player1Count} `;
    result.textContent = `${name2.value}'s Turn`;
    resetShowCount();
    reactions(player1Count,name1.value);
        
    }else if (player2.getAttribute("class") == "active") {

        player2.setAttribute("class","");
    player1.setAttribute("class","active");
    player2Count  =  player2Count + count;
    count = 0;
    player2.textContent = `${name2.value}'s total count is ${player2Count} `;
    result.textContent = `${name1.value}'s Turn`;
    resetShowCount();
    reactions(player2Count,name2.value);

    } 
        

})

// add event listener for the replay play again button
replay.addEventListener("click",()=>{
    resetButton.style.visibility = "visible";
    holdButton.style.visibility = "visible";
    rollButton.style.visibility = "visible";
    count = 0;
    player1Count = 0;
    player2Count = 0;
    player1.textContent = `${name1.value}'s total count is ${player1Count} `;
    player2.textContent = `${name2.value}'s total count is ${player2Count} `;
})

// adds event listener to the reset button
resetButton.addEventListener("click", () => {
    location.reload(true);

})
