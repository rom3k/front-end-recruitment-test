const displayErrorMessage = (id, key) => {
  const element = document.getElementById(id)

  if (element) {
    const tag = element.tagName.toLowerCase()
    const container = document.getElementById(`${tag}-${id}`)
    const errorMessage = prepareErrorMessage(key)
    container.classList.add(`${tag}--error`)

    if (!container.querySelector(`.${tag}__container span.error-message`)) {
      element.parentNode.insertBefore(errorMessage, element.nextSibling)
    } else {
      container.querySelector(
        `.${tag}__container span.error-message`
      ).innerHTML = getErrorMessage(key)
    }
  }
}

const clearErrorMessages = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const tag = element.tagName.toLowerCase()
    const container = document.getElementById(`${tag}-${id}`)
    container.classList.remove(`${tag}--error`)
    if (container.querySelector('span.error-message')) {
      container.querySelector('span.error-message').remove()
    }
  }
}

const getErrorMessage = (key) => {
  switch (key) {
    case 'required':
      return 'This field is required'
    case 'email':
      return 'Invalid e-mail format'
    case 'phoneNumber':
      return 'Invalid phone number format'
    case 'cardNumber':
      return 'Invalid card number format'
    case 'securityCode':
      return 'Invalid security code format'
    case 'expirationDate':
      return 'Invalid date format'
    default:
      return 'Not a valid format'
  }
}

const prepareErrorMessage = (key) => {
  const errorMessage = document.createElement('span')
  errorMessage.classList.add('error-message')
  errorMessage.innerHTML = getErrorMessage(key)
  return errorMessage
}

export { displayErrorMessage, clearErrorMessages }
