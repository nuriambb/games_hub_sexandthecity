import { playSoundEffect } from '../../../main'
import './samanthagame.css'
const main = document.querySelector('main')
main.className = 'main'
const containerSamanthaGame = document.createElement('div')
containerSamanthaGame.className = 'container-samantha-game'
containerSamanthaGame.style.display = 'none'
const containerOfContainer3 = document.createElement('div')
containerOfContainer3.className = 'container-container3'

const presentation3 = document.createElement('div')
presentation3.className = 'div-presentation'
const divtext3 = document.createElement('h3')
divtext3.className = 'div-text3'
const h3samantha = document.createElement('h3')
h3samantha.className = 'h3-samantha'
h3samantha.textContent =
  'Today is hunting night and Samantha knows it! How many men will she catch?.'
const buttonplay3 = document.createElement('button')
buttonplay3.className = 'buttonplay3'

const imgButtonPlay = document.createElement('img')
imgButtonPlay.className = 'play'
imgButtonPlay.src = './assets/carriegame/buttonpause.png'

const imgButtonPause = document.createElement('img')
imgButtonPause.className = 'pause'
imgButtonPause.src = './assets/carriegame/buttonplay.png'

const scoreSnakeDiv = document.createElement('div')
scoreSnakeDiv.className = 'score-snake-div'
const h4scoreSnake = document.createElement('h4')
h4scoreSnake.className = 'h4-score-snake'
h4scoreSnake.innerHTML = 'Points: <span id="score-value3">0</span>'
const h4timeSnake = document.createElement('h4')
h4timeSnake.className = 'h4-time-snake'
h4timeSnake.innerHTML = 'Time: <span id="time-value3">0</span>'

const containerBoard3 = document.createElement('div')
containerBoard3.className = 'container-board-3'
containerBoard3.innerHTML = `   
<div class="grid" id="snake"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid" id="apple"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>
<div class="grid"></div>

`
const winnerloserdiv = document.createElement('div')
winnerloserdiv.className = 'winner-loser-div'
const h3winnerloser = document.createElement('h3')
winnerloserdiv.id = 'winnerloser'
winnerloserdiv.className = 'winnerloser'
winnerloserdiv.appendChild(h3winnerloser)
containerOfContainer3.appendChild(winnerloserdiv)
winnerloserdiv.style.display = 'none'

const buttonsound = new Audio('assets/music/button.mp3')
const clocksound = new Audio('assets/music/clock.mp3')
clocksound.volume = 0.3
const losersound = new Audio('assets/music/loser.mp3')
losersound.volume = 0.5

divtext3.appendChild(h3samantha)
presentation3.appendChild(divtext3)

scoreSnakeDiv.appendChild(h4scoreSnake)
scoreSnakeDiv.appendChild(h4timeSnake)
presentation3.appendChild(scoreSnakeDiv)
buttonplay3.appendChild(imgButtonPlay)
scoreSnakeDiv.appendChild(buttonplay3)
containerOfContainer3.appendChild(presentation3)
containerOfContainer3.appendChild(containerBoard3)

function hideAllGames() {
  const games = document.querySelectorAll(
    '.container-miranda-game, .container-carrie-game, .container-samantha-game'
  )
  for (let i = 0; i < games.length; i++) {
    games[i].style.display = 'none'
  }
  clearInterval(gameInterval)
  clearInterval(timeInterval)
}

let snake = [{ x: 0, y: 0 }]
let direction = { x: 1, y: 0 }
let apple = { x: 5, y: 5 }
let score = 0
const gridSize = 10
let isGamePaused = false
let timeCounter = 0
let gameInterval = null
let timeInterval = null
let speed = 500

function moveSnake() {
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  }

  if (
    newHead.x < 0 ||
    newHead.x >= gridSize ||
    newHead.y < 0 ||
    newHead.y >= gridSize ||
    isCollision(newHead)
  ) {
    const loser = document.getElementById('winnerloser')
    loser.textContent = 'No company tonight! :('
    loser.style.display = 'block'
    presentation3.parentNode.insertBefore(loser, presentation3.nextSibling)
    playSoundEffect(losersound)
    setTimeout(() => {
      loser.style.display = 'none'
    }, 3000)

    resetGame()
    return
  }

  snake.unshift(newHead)

  if (newHead.x === apple.x && newHead.y === apple.y) {
    const cardsound = new Audio('assets/music/card.mp3')
    playSoundEffect(cardsound)
    cardsound.volume = 0.5
    score += 10
    document.getElementById('score-value3').textContent = score
    moveApple()
    increaseSpeed()
    if (score === 80) {
      const winnersound = new Audio('assets/music/winner.mp3')
      playSoundEffect(winnersound)
      winnersound.volume = 0.5
      const winner = document.getElementById('winnerloser')
      winner.textContent =
        "Congratulations! You're going to have a great time tonight"
      winner.style.display = 'block'
      presentation3.parentNode.insertBefore(winner, presentation3.nextSibling)
      setTimeout(() => {
        winner.style.display = 'none'
      }, 4000)

      resetGame()
      return
    }
  } else {
    snake.pop()
  }

  renderGame()
}

function isCollision(position) {
  return snake.some(
    (segment) => segment.x === position.x && segment.y === position.y
  )
}

function moveApple() {
  apple = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
  }
}

function resetGame() {
  const scoreValueElement = document.getElementById('score-value3')
  const timeValueElement = document.getElementById('time-value3')
  localStorage.setItem('samanthaGameScore', score)
  clearInterval(gameInterval)
  clearInterval(timeInterval)
  snake = [{ x: 0, y: 0 }]
  direction = { x: 1, y: 0 }
  score = 0
  timeCounter = 0
  speed = 500
  scoreValueElement.textContent = score
  timeValueElement.textContent = timeCounter
  moveApple()
  renderGame()

  isGamePaused = true
  buttonplay3.innerHTML = ''
  buttonplay3.appendChild(imgButtonPause)
}

function renderGame() {
  while (containerBoard3.firstChild) {
    containerBoard3.removeChild(containerBoard3.firstChild)
  }

  snake.forEach((segment) => {
    const snakeElement = document.createElement('div')
    snakeElement.className = 'grid'
    snakeElement.id = 'snake'
    const snakeImage = document.createElement('img')
    snakeImage.src = './assets/samanthagame/samsnake.png'
    snakeElement.appendChild(snakeImage)

    snakeElement.style.gridColumnStart = segment.x + 1
    snakeElement.style.gridRowStart = segment.y + 1
    containerBoard3.appendChild(snakeElement)
  })

  const appleElement = document.createElement('div')
  appleElement.id = 'apple'
  appleElement.className = 'grid'
  appleElement.style.gridColumnStart = apple.x + 1
  appleElement.style.gridRowStart = apple.y + 1
  const appleImage = document.createElement('img')
  appleImage.src = './assets/samanthagame/mansnake.png'
  appleElement.appendChild(appleImage)
  containerBoard3.appendChild(appleElement)
}

function togglePauseGame() {
  isGamePaused = !isGamePaused
  playSoundEffect(buttonsound)
  buttonsound.volume = 0.5

  if (isGamePaused) {
    clearInterval(gameInterval)
    clearInterval(timeInterval)
    buttonplay3.innerHTML = ''
    buttonplay3.appendChild(imgButtonPause)
  } else {
    startGame()
    buttonplay3.innerHTML = ''
    buttonplay3.appendChild(imgButtonPlay)
  }
}
function startGame() {
  const timeValueElement = document.getElementById('time-value3')
  clearInterval(gameInterval)
  clearInterval(timeInterval)
  gameInterval = setInterval(moveSnake, 500)
  timeInterval = setInterval(() => {
    if (!isGamePaused) {
      timeCounter++
      timeValueElement.textContent = timeCounter

      clocksound.currentTime = 0
      playSoundEffect(clocksound)
    }
  }, 1000)
}

function increaseSpeed() {
  clearInterval(gameInterval)
  speed = Math.max(100, speed - 50)
  gameInterval = setInterval(moveSnake, speed)
}

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault()
      if (direction.y === 0) direction = { x: 0, y: -1 }
      break
    case 'ArrowDown':
      event.preventDefault()
      if (direction.y === 0) direction = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
      event.preventDefault()
      if (direction.x === 0) direction = { x: -1, y: 0 }
      break
    case 'ArrowRight':
      event.preventDefault()
      if (direction.x === 0) direction = { x: 1, y: 0 }
      break
  }
})

function createControlButtons() {
  const controlsContainer = document.createElement('div')
  controlsContainer.className = 'controls-container'

  const upButton = document.createElement('button')
  upButton.className = 'control-button'
  upButton.textContent = '↑'

  const downButton = document.createElement('button')
  downButton.className = 'control-button'
  downButton.textContent = '↓'

  const leftButton = document.createElement('button')
  leftButton.className = 'control-button'
  leftButton.textContent = '←'

  const rightButton = document.createElement('button')
  rightButton.className = 'control-button'
  rightButton.textContent = '→'

  controlsContainer.appendChild(document.createElement('div'))
  controlsContainer.appendChild(upButton)
  controlsContainer.appendChild(document.createElement('div'))
  controlsContainer.appendChild(leftButton)
  controlsContainer.appendChild(document.createElement('div'))
  controlsContainer.appendChild(rightButton)
  controlsContainer.appendChild(document.createElement('div'))
  controlsContainer.appendChild(downButton)
  controlsContainer.appendChild(document.createElement('div'))

  containerSamanthaGame.appendChild(controlsContainer)
  upButton.addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: -1 }
  })

  downButton.addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: 1 }
  })

  leftButton.addEventListener('click', () => {
    if (direction.x === 0) direction = { x: -1, y: 0 }
  })

  rightButton.addEventListener('click', () => {
    if (direction.x === 0) direction = { x: 1, y: 0 }
  })
}
createControlButtons()


export const createSamanthaGame = () => {
  containerSamanthaGame.appendChild(containerOfContainer3)
  main.appendChild(containerSamanthaGame)
  const startButton3 = document.getElementsByClassName('game-3')[0]

  const savedScore = localStorage.getItem('samanthaGameScore')
  if (savedScore !== null) {
    document.getElementById('score-value3').textContent = savedScore
    score = parseInt(savedScore, 10) // Establecer la puntuación recuperada
  }

  if (startButton3) {
    startButton3.addEventListener('click', () => {
      playSoundEffect(buttonsound)
      buttonsound.volume = 0.5
      hideAllGames()
      containerSamanthaGame.style.display = 'block'
      resetGame()
    })
  }
  buttonplay3.removeEventListener('click', togglePauseGame)
  buttonplay3.addEventListener('click', togglePauseGame)

  const startButtonMiranda = document.getElementsByClassName('game-1')[0]
  if (startButtonMiranda) {
    startButtonMiranda.addEventListener('click', () => {
      clearInterval(timeInterval)
      clearInterval(gameInterval)
      console.log('pauso el temporizador y el juego')
    })
  }
  const startButtonCarrie = document.getElementsByClassName('game-2')[0]
  if (startButtonCarrie) {
    startButtonCarrie.addEventListener('click', () => {
      clearInterval(timeInterval)
      clearInterval(gameInterval)
      console.log('pauso el temporizador y el juego')
    })
  }
}
