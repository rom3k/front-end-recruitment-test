import { displayErrorMessage, clearErrorMessages } from './error_display'

const state = {
  _state: {},

  setField (field) {
    if (!this._state[field]) {
      this._state = { ...this._state, ...field }
    }
  },
  getState () {
    return this._state
  },
  getField (id) {
    return this._state[id]
  },
  updateField (id, props) {
    this._state[id][props.key] = props.value
    this.validateField(id, this._state[id])
  },
  validateField: (id, field) => {
    for (const [key, value] of Object.entries(field)) {
      if (value) {
        displayErrorMessage(id, key)
        return
      }
    }
    clearErrorMessages(id)
  },
}
export default state
