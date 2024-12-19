import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';

import { GamesService } from './games.service';
import { Game } from './game.schema';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  async getAll(): Promise<Game[]> {
    return this.gamesService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Game | null> {
    return this.gamesService.getById(id);
  }

  @Post()
  async create(@Body() gameData: Partial<Game>): Promise<Game> {
    return this.gamesService.create(gameData);
  }

  @Post('/join')
  async addPlayer(
    @Body() body: { playerId: string; codeToJoin: string },
  ): Promise<Game | null> {
    return this.gamesService.joinGame(body.playerId, body.codeToJoin);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() gameData: Partial<Game>,
  ): Promise<Game | null> {
    return this.gamesService.update(id, gameData);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Game | null> {
    return this.gamesService.delete(id);
  }

  @Put('/:id/start')
  async startGame(@Param('id') id: string): Promise<Game | null> {
    return this.gamesService.startGame(id);
  }

  @Put('/:id/end')
  async endGame(@Param('id') id: string): Promise<Game | null> {
    return this.gamesService.endGame(id);
  }

  @Get('/:id/player-stats')
  async getGameWithPlayerStats(@Param('id') id: string): Promise<any> {
    return this.gamesService.getGameWithPlayerStats(id);
  }

  @Patch('/:id/activate-player/:playerId')
  async activatePlayer(
    @Param('id') gameId: string,
    @Param('playerId') playerId: string,
  ): Promise<Game | null> {
    return this.gamesService.activatePlayer(gameId, playerId);
  }
}
