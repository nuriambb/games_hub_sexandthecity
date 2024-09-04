import './header.css'

export const createHeader = () => {
  const header = document.querySelector('#myHeader')

  const divFondo1 = document.createElement('div')
  divFondo1.className = 'div-fondo1'

  const images = [
    { className: 'img1', src: './assets/header/mirpixel1.png' },
    { className: 'img2', src: './assets/header/carriepixel1.png' },
    { className: 'img3', src: './assets/header/sampixel1.png' },
    { className: 'img4', src: './assets/header/charpixel1.png' }
  ]

  const addImages = (imagesArray) => {
    imagesArray.forEach((imageData) => {
      const img = document.createElement('img')
      img.className = imageData.className
      img.src = imageData.src
      divFondo1.appendChild(img)
    })
  }

  addImages(images)

  addImages(images)
  addImages(images)

  const divTexto = document.createElement('div')
  divTexto.className = 'div-texto'
  const h1Sex = document.createElement('h1')
  h1Sex.className = 'h1-sex'
  h1Sex.textContent = 'SEX AND THE CITY'
  const h2games = document.createElement('h2')
  h2games.className = 'h2-games'
  h2games.textContent = 'mini games'

  const divButtons = document.createElement('div')
  divButtons.className = 'div-buttons'
  const createButtonWithImage = (className, imgSrc) => {
    const button = document.createElement('button')
    button.className = className

    const img = document.createElement('img')
    img.src = imgSrc
    img.alt = className

    button.appendChild(img)
    return button
  }
  const button1 = createButtonWithImage('game-1', './assets/header/button1.png')
  const button2 = createButtonWithImage('game-2', './assets/header/button2.png')
  const button3 = createButtonWithImage('game-3', './assets/header/button3.png')

  divTexto.appendChild(h1Sex)
  divTexto.appendChild(h2games)

  divButtons.appendChild(button1)
  divButtons.appendChild(button2)
  divButtons.appendChild(button3)

  header.appendChild(divFondo1)
  header.appendChild(divTexto)
  header.appendChild(divButtons)
}
