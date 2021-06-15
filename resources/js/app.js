import '../css/app.css'

const handleButtonClick = () => {
  const btn = document.getElementsByTagName('button')[0]
  btn && btn.addEventListener('click', copyImage)
}

const copyImage = () => {
  const img = document.getElementsByTagName('img')[0]
  if (img) {
    const clone = img.cloneNode(false)
    document.getElementsByTagName('section')[1].appendChild(clone)
  }
}

window.onload = () => {
  handleButtonClick()
}
