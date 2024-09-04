import './style.css'
import { createHeader } from './src/components/header/header'
import { createCarrieGame } from './src/pages/carriegame/carriegame'
import { createMirandaGame } from './src/pages/mirandagame/mirandagame'
import { createSamanthaGame } from './src/pages/samanthagame/samanthagame'
import backgroundMusic from '/assets/music/sexandcity3.mp3'

createHeader()
createCarrieGame()
createMirandaGame()
createSamanthaGame()

let isSoundMuted = localStorage.getItem('isSoundMuted') === 'true'

function initializeMusic() {
  const audio = new Audio(backgroundMusic)
  audio.loop = true
  audio.volume = 0.02

  const isMuted = localStorage.getItem('isMuted') === 'true'
  audio.muted = isMuted

  const playMusic = () => {
    audio.play().catch((e) => {
      console.log('Error al reproducir la música:', e)
    })
  }

  const muteButton = document.createElement('button')
  muteButton.className = 'mute-button'
  muteButton.textContent = isMuted ? '🔇' : '🔊'

  muteButton.addEventListener('click', () => {
    if (audio.muted) {
      audio.muted = false
      playMusic()
      muteButton.textContent = '🔊'
    } else {
      audio.muted = true
      audio.pause()
      muteButton.textContent = '🔇'
    }

    localStorage.setItem('isMuted', audio.muted)
  })

  document.body.appendChild(muteButton)

  const soundMuteButton = document.createElement('button')
  soundMuteButton.className = 'mute-sound-button'
  soundMuteButton.textContent = isSoundMuted ? '🔕' : '🔔'

  soundMuteButton.addEventListener('click', () => {
    isSoundMuted = !isSoundMuted
    soundMuteButton.textContent = isSoundMuted ? '🔕' : '🔔'
    localStorage.setItem('isSoundMuted', isSoundMuted)
  })

  document.body.appendChild(soundMuteButton)

  const startMusicOnUserInteraction = () => {
    if (!audio.muted) {
      playMusic()
    }
    document.removeEventListener('click', startMusicOnUserInteraction)
  }

  document.addEventListener('click', startMusicOnUserInteraction)
}

initializeMusic()

export function playSoundEffect(sound) {
  if (!isSoundMuted) {
    sound.play()
  }
}
