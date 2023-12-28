import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt.payload';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private jwtService: JwtService){}

  async canActivate( context: ExecutionContext,): Promise<boolean>{

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request)
    //! VALIDAR TOKEN Y OBTENER USUARIO

    if(!token) {
      throw new UnauthorizedException('no existe ningun Token');
    }

    try{const payload = await this.jwtService.verifyAsync<JwtPayload>(
      token, {secret : process.env.JWT_SEED}
    );
    
    const user = await this.authService.findUserById(payload.id)
    if(!user) { throw new UnauthorizedException('Usuario no existe')}
    if(!user.isActive) { throw new UnauthorizedException('Usuario no activo')}

    request['user'] = user;
  } catch {

    throw new UnauthorizedException('Token no autorizado')
  }

    return true

  }

  private extractTokenFromHeader( request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ')?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
