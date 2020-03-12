/*
YOUR 2 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
*/

var scores, activePlayer, dice, roundScore, diceElement, gamePlaying, lastDice, winnerScore;
init();
diceElement.style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //random number
        dice = Math.floor(Math.random() * 6) + 1;
        diceElement.style.transform = 'translateX(-50%) rotate(0deg) scale(0)';

        //display the result
        diceElement.style.display = 'block';
        setTimeout(function() {
            diceElement.style.transform = 'translateX(-50%) rotate(360deg) scale(1)';
        }, 100);
        diceElement.src = './image/dice-' + dice + '.png';

        //Update the round score IF the rolled number was NOT a 1
        if (dice === 6 && lastDice === 6) {
            //Player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        lastDice = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game  
        if (scores[activePlayer] >= winnerScore) {
            diceElement.style.display = 'none';
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('#score-' + activePlayer).classList.add('winner');
            gamePlaying = false;
        } else
            nextPlayer();
    }
});



function nextPlayer() {
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    diceElement.style.display = 'none';
}

//creat new game
document.querySelector('.btn-new').addEventListener('click', showNewGameModal);

function showNewGameModal() {
    document.querySelector('.start-form').style.top = "60px";
    document.querySelector('.dark-bg').style.display = 'block';
    // reset new game form
    var newGameForm = document.getElementById('new_game_form');
    newGameForm.reset();
}

document.querySelector('.dark-bg').addEventListener('click', hideNewGameModal);

function hideNewGameModal() {
    document.querySelector('.dark-bg').style.display = 'none';
    document.querySelector('.start-form').style.top = "-700px";
}


document.querySelector('#submit').addEventListener('click', submit);

function submit(e) {
    init();
    e.preventDefault();
    var Player1 = document.querySelector('#name1').value;
    var Player2 = document.querySelector('#name2').value;
    var score = document.querySelector('#score').value;
    if (Player1 && Player2 && score) {
        document.getElementById('name-0').textContent = Player1;
        document.getElementById('name-1').textContent = Player2;
        winnerScore = score;
        document.querySelector('.show-score').textContent = winnerScore;
        hideNewGameModal();
    } else {
        // show errors
        alert('please fill inputs !');
    }

}
document.querySelector('#set_defult').addEventListener('click', setDefult);

function setDefult(e) {
    // reset new game form
    init();
    e.preventDefault();
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = 'Player 2';
    winnerScore = 50;
    document.querySelector('.show-score').textContent = winnerScore;
    hideNewGameModal();
}

document.querySelector('.close-icon').addEventListener('click', hideNewGameModal);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    diceElement = document.querySelector('.dice');
    gamePlaying = true;
    diceElement.style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('#score-0').classList.remove('winner');
    document.querySelector('#score-1').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}