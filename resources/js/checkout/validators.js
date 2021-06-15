import state from './state'

const required = (id, value) => {
  if (!value) {
    state.updateField(id, { key: 'required', value: true })
    return
  }
  state.updateField(id, { key: 'required', value: false })
}

const isRequired = (id, value) => {
  if (typeof state.getField(id).required !== 'undefined') {
    return required(id, value)
  }
  return
}

const email = (id, value) => {
  isRequired(id, value)
  const re =
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  state.updateField(id, {
    key: 'email',
    value: !re.test(value),
  })
}

const phoneNumber = (id, value) => {
  isRequired(id, value)
  const re = /^[0-9]{9}$/
  state.updateField(id, {
    key: 'phoneNumber',
    value: !re.test(value),
  })
}

const cardNumber = (id, value) => {
  isRequired(id, value)
  const re = /^[0-9]{16}$/
  state.updateField(id, {
    key: 'cardNumber',
    value: !re.test(value),
  })
}

const expirationDate = (id, value) => {
  isRequired(id, value)
  const re = /^[0-9]{2}\/[0-9]{2}$/
  state.updateField(id, {
    key: 'expirationDate',
    value: !re.test(value),
  })
}

const securityCode = (id, value) => {
  isRequired(id, value)
  state.updateField(id, {
    key: 'securityCode',
    value: value.length < 3,
  })
}

export {
  required,
  email,
  phoneNumber,
  cardNumber,
  expirationDate,
  securityCode,
}
