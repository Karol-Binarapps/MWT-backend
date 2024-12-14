import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { ConfigModule } from '../config/config.module';
import { GamesModule } from '../games/games.module';
import { UsersModule } from '../users/users.module';
import { StatsModule } from '../stats/stats.module';

@Module({
  imports: [ConfigModule, DbModule, GamesModule, UsersModule, StatsModule],
})
export class AppModule {}
