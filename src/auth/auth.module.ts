import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' })
    ],
    providers: [
        ConfigService,
        JwtStrategy,
    ],
    exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
