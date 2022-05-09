import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {TokenService} from "../token/token.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(
        private tokenService: TokenService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if(bearer !== 'Bearer' || !token){
                throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
                /*throw new UnauthorizedException({message: 'Пользователь не авторизован'})*/
            }
            const user = this.tokenService.verify(token)
            req.user = user
            return true
        } catch (e) {
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
            /*throw new UnauthorizedException({message: 'Пользователь не авторизован'})*/
        }
    }

}