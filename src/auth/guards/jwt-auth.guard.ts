import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const authorization = context.switchToHttp().getRequest()
      .headers.authorization;

    if (isPublic && !authorization) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    //Can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}