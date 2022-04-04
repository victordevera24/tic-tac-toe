

let winningLines = [
    ['b1','b2','b3'],
    ['b4','b5','b6'],
    ['b7','b8','b9'],
    ['b1','b4','b7'],
    ['b2','b5','b8'],
    ['b3','b6','b9'],
    ['b1','b5','b9'],
    ['b3','b5','b7']

];

let board = {};

let playerTurn = true;

let winner = null;

let catsgame = null;

let allBoxes = document.querySelector('.allBoxes')

allBoxes.addEventListener('click' , function(evt) {
    if(evt.target.tagName !== 'TD') return;
    let boxId = evt.target.id;
    redBlue(evt);
    checkingPlayerTurn(boxId);
    checkIfWinner();
})

function checkingPlayerTurn(boxId) {
    if(winner === null) {
        if(boxId in board) return;
        if(playerTurn){
            board[boxId] = "1"
            playerTurn=false;
            document.getElementById('currentPlayer').textContent = "Blue's turn"
        } else {
            board[boxId] = "-1"
            playerTurn=true;
            document.getElementById('currentPlayer').textContent = "Red's turn"
        }
    }
}

function redBlue(evt) {
    if(winner === null) {
        let boxId = evt.target.id
        if( boxId in board === false){
            if(playerTurn===true) {
                evt.target.style.backgroundColor = 'red';
            } else {
                evt.target.style.backgroundColor = 'blue';
            }
        } else {
        return;
        }
    }
}

function checkIfWinner(){
    if (winner === null) {
        let winnerMessage = document.createElement('h2')
        catsgame++
        console.log(catsgame)
        if(catsgame===9){
            winnerMessage.innerHTML = "<h2>Cat's game!</h2>"
            document.body.appendChild(winnerMessage)
        }
        let player1 = {}
        let player2 = {}
        for (const box in board) {
            // console.log( box + " and " + board[box])
            if(board[box] === "1") {
                player1[box] = "1"
            } else if(board[box] === "-1") {
                player2[box] = "-1"
            }
        }
        for(let i=0; i<winningLines.length; i++) {
            let boxesNeeded = 0;
            for(let j=0; j<winningLines[i].length; j++) {
                if(player1[winningLines[i][j]] === "1"){
                    boxesNeeded ++;
                }
                if(boxesNeeded===3){
                    winner = true;
                }
            }
        }
        for(let i=0; i<winningLines.length; i++) {
            let boxesNeeded = 0;
            for(let j=0; j<winningLines[i].length; j++) {
                if(player2[winningLines[i][j]] === "-1"){
                    boxesNeeded ++;
                }
                if(boxesNeeded===3){
                    winner = false;
                }
            }
        }
        if(winner===true){
            console.log("player 1 red is the winner")
            winnerMessage.innerHTML = '<h2>Red is the winner</h2>'
            document.body.appendChild(winnerMessage)
        } else if(winner===false) {
            console.log("player 2 blue is the winner")
            winnerMessage.innerHTML = '<h2>Blue is the winner</h2>'
            document.body.appendChild(winnerMessage)
        }
    }
}