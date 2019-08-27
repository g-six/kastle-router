import { IRouterContext } from 'koa-router'
import { Response } from 'koa'

export enum HttpStatus {
  O_200 = 'success.ok',
  O_201 = 'success.created',
  O_202 = 'success.accepted',
  O_204 = 'success.no-content',
  E_400 = 'error-client.bad-request',
  E_401 = 'error-client.unnauthorized',
  E_402 = 'error-client.payment-required',
  E_403 = 'error-client.forbidden',
  E_404 = 'error-client.not-found',
  E_405 = 'error-client.method-not-allowed',
  E_413 = 'error-client.payload-too-large',
  E_500 = 'error-server.internal-server-error',
  E_501 = 'error-server.not-implemented',
  E_502 = 'error-server.bad-gateway',
  E_503 = 'error-server.service-unavailable',
  E_504 = 'error-server.gateway-timeout',
}

export interface KastleFieldError {
  [key: string]: string
}

export interface KastlePayloadError {
  errors: KastleFieldError
  message: HttpStatus
  status: number
}

export interface KastleResponseBody<Data> {
  message: string
  data?: Data
  errors?: KastleFieldError
}

export interface KastleResponse<Data> extends Response {
  body: KastleResponseBody<Data>
}

export interface KastleContext<Data> extends IRouterContext {
  body: KastleResponseBody<Data>
  response: KastleResponse<Data>
}
