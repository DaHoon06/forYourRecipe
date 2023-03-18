import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '@modules/auth/strategies/local.strategy';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { AuthService } from '@modules/auth/auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'recipe',
      signOptions: {
        algorithm: 'ES512',
        expiresIn: '60h',
      },
    }),
  ],
  providers: [LocalStrategy, JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
