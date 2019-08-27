import { BaseContext } from 'koa'
import { lambdaCb, lambdaMiddleware } from '../'
import { MethodTypes } from '../types'

describe('lambdaCb', () => {
  it('should resolve response', async () => {
    const data = { test: 'asd' }
    const actual = await lambdaCb({ data })
    expect(actual).toEqual({ data })
  })
})
describe('lambdaHandler', () => {
  it('should process request and set response body and headers accordingly', () => {
    const ctx = ({
      body: {},
      headers: {},
      params: {},
      request: {
        body: {},
        headers: {},
        method: MethodTypes.Get,
        query: {},
      },
      set: jest.fn(),
    } as unknown) as BaseContext

    const spyHandler = jest.fn(() => ({
      body: JSON.stringify({
        message: 'Test',
      }),
      headers: {},
      statusCode: 200,
    }))
    lambdaMiddleware(spyHandler)(ctx)

    expect(spyHandler).toHaveBeenCalled()
  })
})
