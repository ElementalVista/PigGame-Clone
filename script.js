'use strict';

//Selecting elements
const player0El =document.querySelector('.player--0')
const player1El =document.querySelector('.player--1')
const score1El = document.querySelector('#score--1')
const score0El = document.querySelector('#score--0')
const displayDice = document.querySelector('.dice')
const btnRoll = document.querySelector('.btn--roll')
const btnNew = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold')
let currentScore1El = document.querySelector('#current--1')
let currentScore0El = document.querySelector('#current--0')
let scores,activePlayer,currentScore,playing


//Starting elements
const init = function(){
    score1El.textContent = 0
    score0El.textContent = 0
    currentScore0El.textContent = 0
    currentScore1El.textContent = 0

    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
    displayDice.classList.add('hidden')
    
    playing = true
    scores = [0,0]
    currentScore = 0
    activePlayer = 0
}

init()

//switch player function
const switchPlayer = function(){
    document.querySelector(`#current--${activePlayer}`).textContent = 0
        currentScore = 0
        activePlayer = activePlayer === 0 ? 1 : 0
        player0El.classList.toggle('player--active')
        player1El.classList.toggle('player--active')
}

//Rolling dice
btnRoll.addEventListener('click',function(){
    if(playing){
    const diceRoll = Math.floor(Math.random() * 6 ) + 1
    displayDice.classList.remove('hidden')
    displayDice.src = `Images/dice-${diceRoll}.png`

    if(diceRoll !== 1){
        currentScore += diceRoll
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore
    }else{
 switchPlayer()
    }
}})

//Hold current number and add to overall score
btnHold.addEventListener('click',function(){
    if(playing){
    scores[activePlayer] += currentScore
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer]

    if(scores[activePlayer] >= 100){
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        displayDice.classList.add('hidden')
        playing = false
    }else{
        switchPlayer()
    }
}})

//Reset to new game
btnNew.addEventListener('click',init)

