import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ApiKeyGuard
        }
    ]
})
export class CommonModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*'); // Applying log to all routes
        // consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*'); // Applying log to all routes except coffees routes
        // consumer.apply(LoggingMiddleware).forRoutes({ // Applying logging only to cofffees route
        //     path: 'coffees',
        //     method: RequestMethod.GET
        // });
    }
}
