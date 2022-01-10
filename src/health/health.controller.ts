import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, TypeOrmHealthIndicator, MemoryHealthIndicator, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { Public } from 'src/common/decorators/public.decorator';
import { Transport, RedisOptions } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private microservice: MicroserviceHealthIndicator
  ) {}

  @Get()
  @Public() // Custom decorator created for public api routes
  @HealthCheck()
  check() {
    return this.health.check([
        () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
        () => this.db.pingCheck('database'),
        async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
        async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
        async () =>
          this.microservice.pingCheck('tcp', {
            transport: Transport.TCP,
            options: { host: 'localhost', port: 8889 },
          }),
        // async () =>
        //   this.microservice.pingCheck<RedisOptions>('redis', {
        //     transport: Transport.REDIS,
        //     options: {
        //       url: 'redis://localhost:6379',
        //     },
        //   }),
    ]);
  }
}