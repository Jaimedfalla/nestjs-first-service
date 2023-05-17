import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService) {}
    
    @Post()
    async login(@Body() {username,password}:AuthDto){
        console.log(password);
        const userValidated = await this.authService.validateUser(username,password);
        
        if(!userValidated) throw new UnauthorizedException('User and password invalid!');
        
        const jwt = this.authService.generateJWT(userValidated);

        return jwt;
    }
}
