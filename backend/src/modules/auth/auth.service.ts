import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
  }

  public async login(payload) {
    const key = this.configService.get<string>('JWT_KEY');
    const token = this.jwtService.sign(payload, {secret: key});
    console.log(token);
  }
}
