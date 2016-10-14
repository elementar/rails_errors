'use strict'

/* eslint-env mocha */

import { describe, it } from 'mocha'
import { expect } from 'chai'

import RailsErrors from '../src/rails_errors'

describe('RailsErrors', () => {
  describe('when there is no errors', () => {
    const re = new RailsErrors({})

    it('should return undefined when getting an error for a field', () => {
      expect(re.forField('some_field')).to.eq(undefined)
    })

    it('should return undefined when getting the first message', () => {
      expect(re.firstMessage).to.eq(undefined)
    })

    it('should return an empty list of fields', () => {
      expect(re.fields).to.eql([])
    })
  })

  describe('when there\'s only one field with error', () => {
    const re = new RailsErrors({ some_field: 'is invalid' })

    it('should return the proper message', () => {
      expect(re.forField('some_field')).to.eq('is invalid')
    })

    it('should return the proper message when asking for the first message', () => {
      expect(re.firstMessage).to.eq('is invalid')
    })

    it('should return the list of fields', () => {
      expect(re.fields).to.eql(['some_field'])
    })
  })

  describe('when there\'s more than one error on a field', () => {
    const re = new RailsErrors({ some_field: ['is invalid', 'has another error'] })

    it('should return the proper message', () => {
      expect(re.forField('some_field')).to.eq('is invalid, has another error')
    })

    it('should return the proper message when asking for the first message', () => {
      expect(re.firstMessage).to.eq('is invalid, has another error')
    })

    it('should return the list of fields', () => {
      expect(re.fields).to.eql(['some_field'])
    })
  })

  describe('when there\'s an error on the whole record (the \'base\')', () => {
    const re = new RailsErrors({ base: ['There is an error'] })

    it('should return the proper message', () => {
      expect(re.forField('base')).to.eq('There is an error')
    })

    it('should return the proper message when asking for the first message', () => {
      expect(re.firstMessage).to.eq('There is an error')
    })

    it('should return the list of fields', () => {
      expect(re.fields).to.eql(['base'])
    })
  })
})
