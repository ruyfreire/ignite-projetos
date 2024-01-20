import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from './public'
import { IS_ADMIN_KEY } from './admin-only'
import { UserPayload } from './jwt.strategy'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    const allow = await super.canActivate(context)

    if (!allow) {
      return false
    }

    const adminRoles = this.reflector.getAllAndOverride<string[]>(
      IS_ADMIN_KEY,
      [context.getHandler(), context.getClass()],
    )
    if (!adminRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user as UserPayload
    if (adminRoles.includes(user.role)) {
      return true
    }

    return false
  }
}
