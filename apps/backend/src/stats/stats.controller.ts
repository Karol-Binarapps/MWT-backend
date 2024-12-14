import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { StatsService } from './stats.service';
import { Stats } from './stats.schema';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async getAll(): Promise<Stats[]> {
    return this.statsService.getAll();
  }

  @Get('/games')
  async getGamesStats(): Promise<any> {
    return this.statsService.getGamesStats();
  }

  @Get('/games/:gameId')
  async getGameStats(@Param('gameId') gameId: string): Promise<any> {
    return this.statsService.getGameStats(gameId);
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Stats | null> {
    return this.statsService.getById(id);
  }

  @Post()
  async create(@Body() statData: Partial<Stats>): Promise<Stats> {
    return this.statsService.create(statData);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() statData: Partial<Stats>,
  ): Promise<Stats | null> {
    return this.statsService.update(id, statData);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Stats | null> {
    return this.statsService.delete(id);
  }
}
