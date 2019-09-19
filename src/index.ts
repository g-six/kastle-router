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

  ctx.body = pick(body, [
    'message',
    'data',
    'error',
    'errors',
    'records',
    'record',
    'status',
  ])
  ctx.status = statusCode
}

const KastleResponseHeaders = {
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Expose-Headers': 'kasl-key',
  'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
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
  KastleResponseHeaders,
  KastleRoute,
  KastleRouter,
  KastleRoutes,
  MethodTypes,
}
