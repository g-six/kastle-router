import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'
import pick from 'lodash/pick'
import { KastleRoute, KastleRoutes, KastleRouter, MethodTypes } from './types'
import {
  KastleContext,
  KastleFieldError,
  KastlePayloadError,
  KastleResponse,
  KastleResponseBody,
  HttpStatus,
} from './types/response'
import { BaseContext } from 'koa'

const lambdaCb = (response: {}) => {
  return Promise.resolve(response)
}

const lambdaMiddleware = (handler: Function) => async (ctx: BaseContext) => {
  const {
    body: koa_body,
    headers: koa_headers,
    method: httpMethod,
    query,
  } = ctx.request
  const event: APIGatewayProxyEvent = ({
    body: JSON.stringify(koa_body),
    headers: koa_headers,
    httpMethod,
    pathParameters: ctx.params,
    queryStringParameters: query,
  } as unknown) as APIGatewayProxyEvent

  const { body: sls_body, headers, statusCode } = (await handler(
    event,
    ({} as unknown) as Context,
    lambdaCb,
  )) as APIGatewayProxyResult

  ctx.set(headers as {})

  const body = JSON.parse(sls_body)

  ctx.body = pick(body, ['message', 'data', 'records', 'record', 'status'])
  ctx.status = statusCode
}

export {
  lambdaCb,
  lambdaMiddleware,
  HttpStatus,
  KastleContext,
  KastleFieldError,
  KastlePayloadError,
  KastleResponse,
  KastleResponseBody,
  KastleRoute,
  KastleRouter,
  KastleRoutes,
  MethodTypes,
}
