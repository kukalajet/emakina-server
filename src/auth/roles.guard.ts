import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  private roles: Role[] = [];

  constructor(...roles: Role[]) {
    this.roles = roles;
  }

  canActivate(context: ExecutionContext): boolean {
    if (!this.roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () =>
      user.roles.some(role => !!this.roles.find(item => item === role));

    return user && user.roles && hasRole();
  }
}
