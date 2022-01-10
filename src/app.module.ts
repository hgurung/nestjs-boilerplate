import * as Joi from 'joi';

import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import appConfig from './config/app.config';
import { APP_PIPE } from '@nestjs/core';
// import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';

import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    // Loading env variables async way
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    ConfigModule.forRoot({
      // ignoreEnvFile: true, // For heroku or some services which dont need env
      // envFilePath: '.environment', // For chaging environment file path
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_USER: Joi.required(),
        DATABASE_PASSWORD: Joi.required(),
        DATABASE_NAME: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
      load: [appConfig],
    }),
    CoffeesModule,
    CoffeeRatingModule,
    // Without async method this should be always below config module
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommonModule,
    // DatabaseModule // Replace if seperate module for database with above typeorm module imports,
    HttpModule,
    TerminusModule // For healthcheck
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    // Global validation pipe
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe
    // }
  ],
})
export class AppModule {}
