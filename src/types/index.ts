import * as Router from 'koa-router'

export enum MethodTypes {
  Delete = 'delete',
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
}

export interface KastleRoute {
  method: MethodTypes
  route: string
  middlewares: Router.IMiddleware[]
}

export interface KastleRoutes {
  [key: string]: KastleRoute
}

export interface KastleRouter {
  routes: KastleRoutes
  baseUrl: string
}
