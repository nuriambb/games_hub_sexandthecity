import { playSoundEffect } from '../../../main'
import './mirandagame.css'
const main = document.querySelector('main')
const containerMirandaGame = document.createElement('div')
containerMirandaGame.className = 'container-miranda-game'
containerMirandaGame.style.display = 'none'
const containerOfContainer = document.createElement('div')
containerOfContainer.className = 'container-container'

const presentation = document.createElement('div')
presentation.className = 'div-presentation'
const h3miranda = document.createElement('h3')
h3miranda.className = 'h3-miranda'
h3miranda.textContent =
  "Miranda sure loves playing tic-tac-toe. And even more so if it's with his other favorite pastime: eating chocolate and talking on the phone with Carrie."
const buttonplay = document.createElement('button')
buttonplay.className = 'buttonplay'
const restart = document.createElement('img')
restart.src = './assets/mirandagame/reset.png'
const containerBoardScore = document.createElement('div')
containerBoardScore.className = 'container-board-score'
buttonplay.appendChild(restart)
presentation.appendChild(h3miranda)
presentation.appendChild(buttonplay)
containerOfContainer.appendChild(presentation)
const buttonsound = new Audio('assets/music/button.mp3')
let boxList
let movesArray
let turn
let playerXWins = 0
let playerOWins = 0
let ties = 0

function saveScores() {
  localStorage.setItem('playerXWins', playerXWins)
  localStorage.setItem('playerOWins', playerOWins)
  localStorage.setItem('ties', ties)
}
function loadScores() {
  playerXWins = parseInt(
    localStorage.getItem('playerXWins', playerXWins) || '0',
    10
  )
  playerOWins = parseInt(
    localStorage.getItem('playerOWins', playerOWins) || '0',
    10
  )
  ties = parseInt(localStorage.getItem('ties') || '0', 10)
  updateScore()
}
function clearLocalStorage() {
  localStorage.removeItem('playerXWins')
  localStorage.removeItem('playerOWins')
  localStorage.removeItem('ties')
}

function hideAllGames() {
  const games = document.querySelectorAll(
    '.container-miranda-game, .container-carrie-game, .container-samantha-game'
  )
  for (let i = 0; i < games.length; i++) {
    games[i].style.display = 'none'
  }
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let combination of winningCombinations) {
    const [a, b, c] = combination
    if (
      movesArray[a] !== null &&
      movesArray[a] === movesArray[b] &&
      movesArray[a] === movesArray[c]
    ) {
      return movesArray[a] ? 'Chocolate' : 'Phone'
    }
  }
  return null
}

function checkTie() {
  return movesArray.every((move) => move !== null)
}

function handleBoxClick(event, index) {
  if (movesArray[index] === null) {
    const box = event.target
    if (turn) {
      const bitesound = new Audio('assets/music/bite.mp3')
      playSoundEffect(bitesound)
      bitesound.volume = 0.5
      box.classList.add('mark-x')
      movesArray[index] = true
    } else {
      const phonesound = new Audio('assets/music/phone.mp3')
      playSoundEffect(phonesound)
      phonesound.volume = 0.5
      box.classList.add('mark-o')
      movesArray[index] = false
    }

    const winner = checkWin()
    if (winner) {
      setTimeout(() => {
        const powersound = new Audio('assets/music/power.mp3')
        playSoundEffect(powersound)
        powersound.volume = 0.5
        const winnerh3 = document.querySelector('#winner h3')
        winnerh3.textContent = `${winner} is your plan tonight!`
        document.getElementById('winner').style.display = 'block'
        makeEndGame(winner)
      }, 900)
    } else if (checkTie()) {
      setTimeout(() => {
        const winnerh3 = document.querySelector('#winner h3')
        winnerh3.textContent = `It's a tie!`
        document.getElementById('winner').style.display = 'block'
        makeEndGame('Tie')
      }, 900)
    } else {
      turn = !turn
    }
  }
}

function resetGame() {
  movesArray.fill(null)
  turn = true
  boxList.forEach((box, index) => {
    box.classList.remove('mark-x', 'mark-o')
    box.textContent = ''
    box.removeEventListener('click', handleBoxClick)
    box.addEventListener('click', (event) => handleBoxClick(event, index))
  })
  const winnerH3 = document.querySelector('#winner h3')
  winnerH3.textContent = ''
  document.getElementById('winner').style.display = 'none'
  const winnerDiv = document.getElementById('winner')
  if (winnerDiv) {
    winnerDiv.style.display = 'none'
  }
}

function updateScore() {
  const playerXWinsElem = document.getElementById('playerXWins')
  const playerOWinsElem = document.getElementById('playerOWins')
  const tiesElem = document.getElementById('ties')

  if (playerXWinsElem && playerOWinsElem && tiesElem) {
    playerXWinsElem.textContent = `Chocolate Wins: ${playerXWins}`
    playerOWinsElem.textContent = `Phone Wins: ${playerOWins}`
    tiesElem.textContent = `Ties: ${ties}`
  } else {
    console.error('faltan elementos para mostrar los puntos')
  }
}

function makeEndGame(winner) {
  if (winner === 'Chocolate') {
    playerXWins++
  } else if (winner === 'Phone') {
    playerOWins++
  } else {
    ties++
  }

  updateScore()
  saveScores()

  if (playerXWins === 3 || playerOWins === 3 || ties === 3) {
    setTimeout(() => {
      const winnersound = new Audio('assets/music/winner.mp3')
      playSoundEffect(winnersound)
      const winnerH3 = document.querySelector('#winner h3')
      if (winnerH3) {
        winnerH3.textContent = ''
        winnerH3.textContent = `${winner} is your vibe!`
      }
      const winnerDiv = document.getElementById('winner')
      if (winnerDiv) {
        winnerDiv.style.display = 'block'
      }
      playerXWins = 0
      playerOWins = 0
      ties = 0
      updateScore()
      saveScores()
    }, 1500)
  } else {
    setTimeout(resetGame, 1000)
  }
}

setTimeout(() => {
  loadScores()
  boxList = document.querySelectorAll('.box')
  movesArray = new Array(9).fill(null)
  turn = true

  boxList.forEach(function (box, index) {
    box.textContent = ''
    box.addEventListener('click', (event) => handleBoxClick(event, index))
  })

  buttonplay.addEventListener('click', () => {
    playSoundEffect(buttonsound)
    clearLocalStorage()
    playerXWins = 0
    playerOWins = 0
    ties = 0
    updateScore()
    resetGame()
  })
}, 0)

export const createMirandaGame = () => {
  const boardMiranda = document.createElement('div')
  boardMiranda.className = 'board-miranda'
  boardMiranda.innerHTML = `   <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      `
  const winenertxt = document.createElement('div')
  winenertxt.className = 'winner-alert-div'
  const h3winner = document.createElement('h3')
  winenertxt.id = 'winner'
  winenertxt.className = 'winner'
  winenertxt.appendChild(h3winner)
  containerOfContainer.appendChild(winenertxt)
  const score = document.createElement('div')
  score.className = 'score-div'
  const h3x = document.createElement('h3')
  h3x.id = 'playerXWins'
  h3x.textContent = 'Chocolate Wins: 0'
  const h3o = document.createElement('h3')
  h3o.id = 'playerOWins'
  h3o.textContent = 'Phone Wins: 0'
  const h3t = document.createElement('h3')
  h3t.id = 'ties'
  h3t.textContent = 'Ties: 0'
  score.appendChild(h3x)
  score.appendChild(h3o)
  score.appendChild(h3t)
  containerBoardScore.appendChild(score)

  containerBoardScore.appendChild(boardMiranda)

  document.addEventListener('DOMContentLoaded', () => {
    containerOfContainer.appendChild(containerBoardScore)

    containerMirandaGame.appendChild(containerOfContainer)
    main.appendChild(containerMirandaGame)
    const startButtonMiranda = document.getElementsByClassName('game-1')[0]

    if (startButtonMiranda) {
      startButtonMiranda.addEventListener('click', () => {
        playSoundEffect(buttonsound)
        buttonsound.volume = 0.5

        console.log('funciono')
        hideAllGames()
        containerMirandaGame.style.display = 'block'

        resetGame()

        console.log('muestro el juego de miranda')
      })
    }
  })
}
