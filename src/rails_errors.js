'use strict'

import get from 'lodash.get'
import head from 'lodash.head'

/**
 * Parses Rails errors, so they can be used on the client side.
 */
class RailsErrors {
  constructor(errors) {
    this.errors = errors
  }

  /**
   * Returns the list of fields with errors.
   *
   * @returns {Array<string>}
   */
  get fields() {
    return Object.keys(this.errors)
  }

  /**
   * Returns the first error message.
   *
   * @returns {string} the first error message, or undefined if there's none
   */
  get firstMessage() {
    const firstField = head(this.fields)
    return firstField && this.forField(firstField)
  }

  /**
   * Gets the error messages for an specific field.
   * If the field have more than one error message, they will be joined by a comma.
   *
   * @param fieldName the field name
   * @returns {string} the message (or messages) for the field
   */
  forField(fieldName) {
    let msgs = get(this.errors, fieldName)
    if (!msgs)
      return

    if (!Array.isArray(msgs))
      msgs = [msgs]

    msgs = msgs.map(this.fixErrorMessage)

    return msgs.join(', ')
  }

  /**
   * Performs adjustments on the error messages.
   *
   * @param msg the error message
   * @returns {string} the fixed error message
   */
  fixErrorMessage(msg) {
    msg = String(msg)

    // removes a leading '^' on the message
    if (msg && msg.substr(0, 1) === '^')
      msg = msg.substr(1)

    return msg
  }
}

export default RailsErrors
