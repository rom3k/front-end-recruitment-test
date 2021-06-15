import * as validators from './validators'
import state from './state'
import axios from 'axios'

const setValidations = () => {
  const form = document.getElementById('checkout')
  /** @type HTMLCollection */
  const elements = form.elements

  const requriedFields = ['firstName', 'lastName', 'postalCode', 'country']
  requriedFields.forEach((el) => {
    elements[el].addEventListener('blur', (event) =>
      validators.required(event.target.id, event.target.value)
    )
    state.setField({
      [el]: {
        required: false,
      },
    })
  })
  elements['email'].addEventListener('blur', (event) =>
    validators.email(event.target.id, event.target.value)
  )
  state.setField({
    email: {
      required: false,
      email: false,
    },
  })
  elements['phone'].addEventListener('blur', (event) =>
    validators.phoneNumber(event.target.id, event.target.value)
  )
  state.setField({
    phone: {
      required: false,
      phoneNumber: false,
    },
  })
  elements['creditCard'].addEventListener('blur', (event) =>
    validators.cardNumber(event.target.id, event.target.value)
  )
  state.setField({
    creditCard: {
      required: false,
      cardNumber: false,
    },
  })
  elements['CVV'].addEventListener('blur', (event) =>
    validators.securityCode(event.target.id, event.target.value)
  )
  state.setField({
    CVV: {
      required: false,
      securityCode: false,
    },
  })
  elements['expDate'].addEventListener('blur', (event) =>
    validators.expirationDate(event.target.id, event.target.value)
  )
  state.setField({
    expDate: {
      required: false,
      expirationDate: false,
    },
  })
}

const setSubmitHandler = () => {
  const form = document.getElementById('checkout')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    touch()
    if (!fieldsInvalid()) {
      let data = {}
      Array.from(form.elements).forEach((el) => {
        if (el.value) {
          data = { ...data, [el.id]: el.value }
        }
      })

      axios
        .post('/order', data)
        .then((response) => showMessage(response.data.message, 'success'))
        .catch((error) => showMessage(error.response.data.message, 'error'))
    }
  })
}

const touch = () => {
  const form = document.getElementById('checkout')
  const elements = form.elements

  const requriedFields = ['firstName', 'lastName', 'postalCode', 'country']
  requriedFields.forEach((el) => {
    validators.required(el, elements[el].value)
  })

  validators.email('email', elements['email'].value)
  validators.phoneNumber('phone', elements['phone'].value)
  validators.cardNumber('creditCard', elements['creditCard'].value)
  validators.securityCode('CVV', elements['CVV'].value)
  validators.expirationDate('expDate', elements['expDate'].value)
}

const fieldsInvalid = () => {
  const currentState = state.getState()
  for (const [item, params] of Object.entries(currentState)) {
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        return true
      }
    }
  }
  return false
}

const showMessage = (message, type) => {
  const snack = document.getElementById('checkoutSnackbar')

  snack.classList.add('snackbar--visible', `snackbar--${type}`)
  snack.innerHTML = message

  setTimeout(
    () => snack.classList.remove('snackbar--visible', `snackbar--${type}`),
    3000
  )
}

window.onload = () => {
  setValidations()
  setSubmitHandler()
}
