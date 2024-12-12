import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerStatsModule } from './player-stats/player-stats.module';

@Module({
  imports: [PlayerStatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
