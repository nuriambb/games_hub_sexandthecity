import { playSoundEffect } from '../../../main'
import './carriegame.css'

const main = document.querySelector('main')
const containerCarrieGame = document.createElement('div')
containerCarrieGame.className = 'container-carrie-game'
containerCarrieGame.style.display = 'none'
const containerContainer2 = document.createElement('div')
containerContainer2.className = 'container-container2'

const score = document.createElement('div')
score.className = 'div-score'
const h3div = document.createElement('div')
h3div.className = 'h3-div'
const h3sentence = document.createElement('h3')
h3sentence.className = 'h3-sentence'
h3sentence.textContent =
  'Are you a true fashion victim like Carrie? Prove it by enhancing some of her most iconic looks.'

const h4div = document.createElement('h4')
h4div.className = 'h4-div'
const h4score = document.createElement('h4')
h4score.className = 'h4-score'
h4score.innerHTML = 'Points: <span id="score-value">0</span>'

const h4time = document.createElement('h4')
h4time.className = 'h4-time'
h4time.innerHTML = 'Time: <span id="time-value">0</span>'

const buttonPlay = document.createElement('button')
buttonPlay.className = 'button-play'

const imgbuttonPlay = document.createElement('img')
imgbuttonPlay.className = 'play'
imgbuttonPlay.src = './assets/carriegame/buttonpause.png'

const imgbuttonPause = document.createElement('img')
imgbuttonPause.className = 'pause'
imgbuttonPause.src = './assets/carriegame/buttonplay.png'

const winnerloserdiv = document.createElement('div')
winnerloserdiv.className = 'winner-loser-div'
const h3winnerloser = document.createElement('h3')
winnerloserdiv.id = 'winnerloser'
winnerloserdiv.className = 'winnerloser'
winnerloserdiv.appendChild(h3winnerloser)
containerContainer2.appendChild(winnerloserdiv)
winnerloserdiv.style.display = 'none'

const losersound = new Audio('assets/music/loser.mp3')
const buttonsound = new Audio('assets/music/button.mp3')

h3div.appendChild(h3sentence)
buttonPlay.appendChild(imgbuttonPlay)
score.appendChild(h3div)
h4div.appendChild(h4score)
h4div.appendChild(h4time)
h4div.appendChild(buttonPlay)
score.appendChild(h4div)

const board = document.createElement('div')
board.className = 'board'

let flippedCards = []
let lockBoard = false
let matchedCardsCount = 0
let scoreValue = 0
let timer

let seconds = 0
let isPaused = false
const imagesMemory = [
  { id: 1, src: './assets/carriegame/memory1.jpeg', alt: 'Image 1' },
  { id: 2, src: './assets/carriegame/memory2.jpeg', alt: 'Image 2' },
  { id: 3, src: './assets/carriegame/memory3.jpeg', alt: 'Image 3' },
  { id: 4, src: './assets/carriegame/memory4.jpeg', alt: 'Image 4' },
  { id: 5, src: './assets/carriegame/memory5.jpeg', alt: 'Image 5' },
  { id: 6, src: './assets/carriegame/memory6.jpeg', alt: 'Image 6' }
]
const totalPairs = imagesMemory.length

function createCard() {
  const doubledImages = imagesMemory.concat(imagesMemory)
  doubledImages.sort(() => 0.5 - Math.random())
  board.innerHTML = ''

  doubledImages.forEach((image) => {
    const card = document.createElement('div')
    card.className = 'card'
    card.dataset.id = image.id

    const frontCard = document.createElement('img')
    frontCard.src = image.src
    frontCard.alt = image.alt
    frontCard.className = 'front-card'

    const backCard = document.createElement('img')
    backCard.src = './assets/carriegame/backcard2.png'
    backCard.alt = 'Back of the card'
    backCard.className = 'back-card'

    card.appendChild(backCard)
    card.appendChild(frontCard)
    board.appendChild(card)

    card.addEventListener('click', handleCardClick)
  })
}

function handleCardClick() {
  if (lockBoard || flippedCards.includes(this) || isPaused) return

  this.classList.add('flipped')
  flippedCards.push(this)
  const cardsound = new Audio('assets/music/card.mp3')
  playSoundEffect(cardsound)
  cardsound.volume = 0.5

  if (flippedCards.length === 2) {
    checkForMatch()
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards
  if (card1.dataset.id === card2.dataset.id) {
    disableCards()
    updateScore(2)
  } else {
    unflipCards()
    updateScore(-1)
  }
}

function disableCards() {
  flippedCards[0].removeEventListener('click', handleCardClick)
  flippedCards[1].removeEventListener('click', handleCardClick)
  matchedCardsCount++
  const powersound = new Audio('assets/music/power.mp3')
  playSoundEffect(powersound)
  powersound.volume = 0.4
  if (matchedCardsCount === totalPairs) {
    setTimeout(() => {
      if (scoreValue > 0) {
        const winnersound = new Audio('assets/music/winner.mp3')
        playSoundEffect(winnersound)
        winnersound.volume = 0.5
        const winner = document.getElementById('winnerloser')
        winner.textContent = 'You are a true fashion lover!'
        winner.style.display = 'block'
        score.parentNode.insertBefore(winner, score.nextSibling)

        setTimeout(() => {
          winner.style.display = 'none'
        }, 3000)
      } else {
        playSoundEffect(losersound)
        losersound.volume = 0.4
        const noscore = document.getElementById('winnerloser')
        noscore.textContent =
          'You completed it, but your score is 0 or lower! You have lost.'
        noscore.style.display = 'block'
        score.parentNode.insertBefore(noscore, score.nextSibling)

        setTimeout(() => {
          noscore.style.display = 'none'
        }, 2000)
      }
      restartGame()
    }, 500)
  }
  resetBoard()
}

function unflipCards() {
  lockBoard = true
  setTimeout(() => {
    flippedCards[0].classList.remove('flipped')
    flippedCards[1].classList.remove('flipped')
    resetBoard()
  }, 1000)
}

function resetBoard() {
  flippedCards = []
  lockBoard = false
}

function restartGame() {
  matchedCardsCount = 0
  scoreValue = 0
  seconds = 0
  document.getElementById('score-value').textContent = scoreValue
  document.getElementById('time-value').textContent = seconds
  clearInterval(timer)
  createCard()
  startTimer()
}

function startTimer() {
  clearInterval(timer)
  const clocksound = new Audio('assets/music/clock.mp3')
  clocksound.volume = 0.2
  timer = setInterval(() => {
    if (!isPaused) {
      seconds++
      document.getElementById('time-value').textContent = seconds
      clocksound.currentTime = 0
      playSoundEffect(clocksound)
      if (seconds >= 60) {
        clearInterval(timer)
        playSoundEffect(losersound)
        losersound.volume = 0.4

        const loser = document.getElementById('winnerloser')
        loser.textContent = "Time's up! You have lost"
        loser.style.display = 'block'
        score.parentNode.insertBefore(loser, score.nextSibling)

        setTimeout(() => {
          loser.style.display = 'none'
        }, 2000)

        restartGame()
      }
    }
  }, 1000)
}

function updateScore(amount) {
  scoreValue += amount
  document.getElementById('score-value').textContent = scoreValue
}

function togglePause() {
  isPaused = !isPaused

  playSoundEffect(buttonsound)
  buttonsound.volume = 0.5

  if (isPaused) {
    clearInterval(timer)
    buttonPlay.removeChild(imgbuttonPlay)
    buttonPlay.appendChild(imgbuttonPause)
    buttonPlay.classList.add('paused')

    console.log('estoy en pausa')
  } else {
    startTimer()
    buttonPlay.removeChild(imgbuttonPause)
    buttonPlay.appendChild(imgbuttonPlay)

    buttonPlay.classList.remove('paused')
  }
}

function hideAllGames() {
  const games = document.querySelectorAll(
    '.container-miranda-game, .container-carrie-game, .container-samantha-game'
  )
  for (let i = 0; i < games.length; i++) {
    games[i].style.display = 'none'
  }
}

export const createCarrieGame = () => {
  document.addEventListener('DOMContentLoaded', () => {
    containerContainer2.appendChild(score)
    containerContainer2.appendChild(board)
    containerCarrieGame.appendChild(containerContainer2)
    main.appendChild(containerCarrieGame)

    const startButton = document.getElementsByClassName('game-2')[0]

    if (startButton) {
      startButton.addEventListener('click', initGame)
    }

    buttonPlay.addEventListener('click', togglePause)

    function initGame() {
      playSoundEffect(buttonsound)
      buttonsound.volume = 0.5
      hideAllGames()
      containerCarrieGame.style.display = 'block'

      restartGame()
    }
    const startButtonMiranda = document.getElementsByClassName('game-1')[0]
    if (startButtonMiranda) {
      startButtonMiranda.addEventListener('click', () => {
        clearInterval(timer)
        console.log('pauso el temporizador')
      })
    }
    const startButtonSamantha = document.getElementsByClassName('game-3')[0]
    if (startButtonSamantha) {
      startButtonSamantha.addEventListener('click', () => {
        clearInterval(timer)
        console.log('pauso el temporizador')
      })
    }
  })
}
