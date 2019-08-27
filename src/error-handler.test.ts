import { ValidationErrorItem } from '@hapi/joi'
import { invalidRequestReducer } from './'

describe('Error handler', () => {
  describe('invalidRequestReducer', () => {
    it('should return errors object and status code 400', () => {
      const expected = {
        errors: {
          field: 'min.required',
        },
        statusCode: 400,
      }
      const validationErrorItems: ValidationErrorItem[] = [
        {
          context: {
            key: 'field',
          },
          message: 'bad',
          type: 'min.required',
          path: ['min.required'],
        },
      ]
      const response = invalidRequestReducer(validationErrorItems)
      expect(response).toEqual(expected)
    })
  })
})
