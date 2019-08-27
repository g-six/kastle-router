import { ValidationErrorItem } from '@hapi/joi'

export const invalidRequestReducer = (errors: ValidationErrorItem[]) => {
  return {
    errors: errors.reduce(
      /* istanbul ignore next */
      (obj: { [index: string]: string } = {}, item) => {
        if (item.context && item.context.key) {
          obj[item.context.key] = item.type
          return obj
        }
      },
      {},
    ),
    statusCode: 400,
  }
}
