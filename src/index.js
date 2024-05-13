import { saveToLS, loadToLS } from './helpers';



const btnAddPlayer = document.querySelector(".btn_add");
const inputAdd = document.querySelector("#name");
const output = document.querySelector(".outputName");
const errorMessage = document.querySelector(".error_message");
const formAddPlayer = document.querySelector(".form_add_player");

////////////////////////-local-storage////////////////////////

const nameLS = "arrayPlayersName";

///////////////////////////////////////////////

let newPlayer = "";
let playersName = loadToLS(nameLS);

formAddPlayer.addEventListener("input", inputPlayer);

// const playersName = ["Вакуленко", "Вовк", "Киреу", "Реутов", "Овчаров", "Яковлев",
//     "Похил", "Спасский", "Семченко", "Мищенко"];

function inputPlayer() {
    const testName = formAddPlayer.elements.name.value;
    output.textContent = testName;
    errorMessage.textContent = "";
    newPlayer = testName;
};

formAddPlayer.addEventListener("submit", addPlayer);

function addPlayer(e) {
    e.preventDefault();
   
    const testName = formAddPlayer.elements.name.value;
    newPlayer = testName;
    console.log(newPlayer);
    if (playersName.includes(newPlayer)) {
        errorMessage.textContent = `игрок ${newPlayer} уже учавствует в турнире. Добавьте другого игрока!`;
        console.log(`игрок ${newPlayer} уже есть`);
        return;
    } else if (newPlayer === "") {
        errorMessage.textContent = "Неверное значение!"
    }
    else {
        output.textContent = `Добро пожаловать ${newPlayer}! Регистрация прошла успешно!`;
        console.log(playersName);
        playersName.push(newPlayer);

        saveToLS(nameLS, playersName);

        console.log(newPlayer);
        console.dir(playersName);
        formAddPlayer.reset();
    }
///////////////////////////////////////////////////copy//////
    // e.preventDefault();
   
    // const testName = formAddPlayer.elements.name.value;
    // newPlayer = testName;


    // if (playersName.includes(newPlayer)) {
    //     errorMessage.textContent = `игрок ${newPlayer} уже учавствует в турнире. Добавьте другого игрока!`;
    //     console.log(`игрок ${newPlayer} уже есть`);
    //     return;
    // } else if (newPlayer === "") {
    //     errorMessage.textContent = "Неверное значение!"
    // }
    // else {
    //     output.textContent = `Добро пожаловать ${newPlayer}! Регистрация прошла успешно!`;
    //     playersName.push(newPlayer);

    //     saveToLS(nameLS, playersName);

    //     console.log(newPlayer);
    //     console.dir(playersName);
    //     formAddPlayer.reset();
    // }
    //////copy//////
    
};




const allPlayers = playersName.length;
console.log(allPlayers);


const nameToLowerCase = playersName.map(player => player.toUpperCase()).toSorted();
const sortNamesPlayers = playersName.toSorted();
console.log(sortNamesPlayers);

//////////////////////////////////class Team/////////////////////////////

class Team {
    constructor(player1, player2, id, arrayGame = [], totalGame = 0, wins = 0, winPercentage = 0,
        seriesWins = 0, bestSeries = 0, gameDeadHeat) {
        this.player1 = player1;
        this.player2 = player2;
        this.id = id;
        this.arrayGame = arrayGame;
        this.totalGame = totalGame;
        this.wins = wins;
        this.winPercentage = winPercentage;
    }


}
///create array with all variable team////
let arrayTeam = [];

function createTeam(array) {
        
    for (let a = 0; a < array.length; a += 1) {
                
        for (let i = 0; i < array.length; i += 1) {
            if (a < array.length) {
                if (array[a] !== array[i]) {
                   
                    const newT = new Team(); 
                    newT.player1 = array[a];
                    newT.player2 = array[i];
                    arrayTeam.push(newT);
                } else {
                    continue;
                } 
            } else if (a === array.length) {
                a += 1;
            }
        }
    }
}

createTeam(sortNamesPlayers);
console.dir(arrayTeam);

/////////////////////////////////unique teams//////////////////////////////////////
let teamArray = [...arrayTeam];

function createUniqueTeam(array) {
    
    for (let a = 0; a < array.length; a += 1) {
   
        for (let i = 0; i < array.length; i += 1) {
             
            if (array[a].player1 === array[i].player2
            && array[a].player2 === array[i].player1) {
                    //такая команда уже есть!!!//////
                    teamArray.splice(i, 1);
            }
        };
    };
};

createUniqueTeam(teamArray);

///////////////////////////////add index for team////////////////////

function addIndex(array) {
    for (let i = 0; i < array.length; i += 1) {
        array[i].id = i + 1;
    }
};

addIndex(teamArray);
console.log(teamArray);

////////////////////////////////start random number ///////////////

const btnGeneration = document.querySelector(".js-btn");
const firstNumber = document.querySelector(".js-firstNumber");
const secondNumber = document.querySelector(".js-secondNumber");

btnGeneration.addEventListener("click", createNumber);

const minValue = 0;
const maxValue = teamArray.length + 1;

function randomTeamNumber() {
    const result = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    return result;
}


function createNumber(e) {
    e.preventDefault();
    const firstTeam = randomTeamNumber();
    const secondTeam = randomTeamNumber();
    
    // firstTeam !== secondTeam
    let firstCheck = teamArray[firstTeam].player1 !== teamArray[secondTeam].player1 &&
        teamArray[firstTeam].player1 !== teamArray[secondTeam].player2;
    let secondCheck = teamArray[firstTeam].player2 !== teamArray[secondTeam].player1 &&
        teamArray[firstTeam].player2 !== teamArray[secondTeam].player2;
    
    if (firstCheck && secondCheck) {
        firstNumber.textContent = `${teamArray[firstTeam].id} ${teamArray[firstTeam].player1} и ${teamArray[firstTeam].player2}`;
        secondNumber.textContent = `${teamArray[secondTeam].id} ${teamArray[secondTeam].player1} и ${teamArray[secondTeam].player2}`;
    }
    gamesDay.push(`${firstTeam} + ${secondTeam}`);
    console.log(gamesDay);
}

/////////////////////
const gamesDay = [];

///////////////////////////show players list/////////
const jsPlayerList = document.querySelector(".js_players_list");
const jsQuantityPlayers = document.querySelector(".js-quantityPlayers");

jsQuantityPlayers.textContent = `(всего ${playersName.length} игроков):`;

const markup = sortNamesPlayers
  .map((name) => `<li class="players_list_item">
                <p class="player_name">${name}</p>
                </li>`)
  .join("");

jsPlayerList.insertAdjacentHTML("beforeend", markup);
/////////////////////////////////////////////////////////

 /////////////////////////show teams list//////////////////
const jsTeamList = document.querySelector(".js_team_list");

const markupTeam = teamArray
  .map((team) => `<li class="team_list_item">
                <p class="team_name">№${team.id}: ${team.player1} и ${team.player2}</p>
                </li>`)
  .join("");

jsTeamList.insertAdjacentHTML("beforeend", markupTeam);
  
////////////////////////////gaming session////////////////
const sessionList = document.querySelector(".js_form_GS");

const markupListPlayer = sortNamesPlayers
  .map((player) => `<label>
    <input type="checkbox" name="player" value="${player}"/>
    ${player}
  </label>`)
  .join("");

sessionList.insertAdjacentHTML("afterbegin", markupListPlayer);

let readyToPlay = [];

// sessionList.addEventListener("input", readyPlayers);

// function readyPlayers(e) {
    
//     // readyToPlayer.push(toReady);
// };

//////////////////////////////////////add game to team///////

const formAddGame = document.querySelector(".form_add_game");
const selectTeam1 = document.querySelector(".js_choose_team1");
const selectTeam2 = document.querySelector(".js_choose_team2");

const markupChooseTeam = teamArray
  .map((team) => `<option value="${team.id}">${team.player1} ${team.player2}</option>`)
  .join("");

selectTeam1.insertAdjacentHTML("afterbegin", markupChooseTeam);
selectTeam2.insertAdjacentHTML("afterbegin", markupChooseTeam);

const btnToAddGame = document.querySelector(".js_add_game");
const dataGame = document.querySelector("#data-game");
const scoreTeam1 = document.querySelector("#scoreTeam1");
const scoreTeam2 = document.querySelector("#scoreTeam2");

btnToAddGame.addEventListener("click", addGame);

function addGame(e) {
    e.preventDefault();

    const id1 = selectTeam1.value - 1; //
    const id2 = selectTeam2.value - 1;

    let newGameT1 = {
        data: dataGame.value,
        id: id2 + 1,
        score: scoreTeam1.value,
        scoreT2: scoreTeam2.value,
        team: `${teamArray[id2].player1} ${teamArray[id2].player2}`,
    };
    let newGameT2 = {
        data: dataGame.value,
        id: id1 + 1,
        score: scoreTeam2.value,
        scoreT1: scoreTeam1.value,
        team: `${teamArray[id1].player1} ${teamArray[id1].player2}`,
    };
   
    let checkTeam1 = teamArray[id1].player1 !== teamArray[id2].player1 &&
        teamArray[id1].player1 !== teamArray[id2].player2;
    let checkTeam2 = teamArray[id1].player2 !== teamArray[id2].player1 &&
        teamArray[id1].player2 !== teamArray[id2].player2;
    
    let checkScore1 = scoreTeam1.value >= 0 && scoreTeam1.value <= 22;
    let checkScore2 = scoreTeam2.value >= 0 && scoreTeam2.value <= 22;
    let checkScore3 = scoreTeam1.value >= 21 || scoreTeam2.value >= 21;
    let checkScore = scoreTeam1.value !== scoreTeam2.value;


    if (checkTeam1 && checkTeam2 && checkScore1 &&
        checkScore2 && checkScore3 && checkScore) {
        
        let checkGame = teamArray[id1].arrayGame.some(id => id = id + 1);

        if (checkGame) {
            console.log("this game alredy add");
                
        } else {
            teamArray[id1].arrayGame.push(newGameT1);
            teamArray[id2].arrayGame.push(newGameT2);

            console.log(newGameT1);
            console.log(newGameT2);
            console.log("игра добавлена");
        }
        
    } else {
        console.log("Error!");
    };
};


// BracketTree и Tournament.jsnpm