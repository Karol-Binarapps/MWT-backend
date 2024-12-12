import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayerStatsService } from './player-stats.service';

@Controller('player-stats')
export class PlayerStatsController {
  constructor(private readonly playerStatsService: PlayerStatsService) {}

  @Get()
  async findAll() {
    // return process.env.FIRESTORE_PROJECT_ID + ' project id';
    return await this.playerStatsService.findAll();
  }

  @Post('/')
  async postPlayerStats(@Body() body: any) {
    return await this.playerStatsService.postPlayerStats(body);
  }
}
