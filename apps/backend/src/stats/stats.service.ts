import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Stats } from './stats.schema';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Stats.name) private readonly statsModel: Model<Stats>,
  ) {}

  async getAll(): Promise<Stats[]> {
    return this.statsModel
      .find()
      .populate('player')
      .populate({
        path: 'game',
        select: '-players',
      })
      .exec();
  }

  async getById(id: string): Promise<Stats | null> {
    return this.statsModel.findById(id).exec();
  }

  async create(statsData: Partial<Stats>): Promise<Stats> {
    const newStats = new this.statsModel(statsData);
    return newStats.save();
  }

  async update(id: string, statsData: Partial<Stats>): Promise<Stats | null> {
    return this.statsModel
      .findByIdAndUpdate(id, statsData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Stats | null> {
    return this.statsModel.findByIdAndDelete(id).exec();
  }

  async getGamesStats(): Promise<GameStatsDto> {
    const statsArr = await this.statsModel.find().exec();

    const mapped = this.gameStatsMapper(statsArr);

    return mapped;
  }

  async getGameStats(gameId: string): Promise<GameStatsDto> {
    const statsArr = await this.statsModel.find({ game: gameId }).exec();

    const mapped = this.gameStatsMapper(statsArr);

    return mapped;
  }

  private gameStatsMapper(statsArray: Stats[]): GameStatsDto {
    const mapped = {};

    statsArray.forEach((stat) => {
      const gameId = stat.game?.['_id'] ?? stat.game;
      const playerId = stat.player?.['_id'] ?? stat.player;
      const statId = stat._id;

      if (!mapped[gameId]) {
        mapped[gameId] = {};
      }

      if (!mapped[gameId][playerId]) {
        mapped[gameId][playerId] = {};
      }

      mapped[gameId][playerId][statId] = {
        bloodPressure: stat.bloodPressure,
        timestamp: stat.timestamp,
        position: stat.position,
        bullets: stat.bullets,
        health: stat.health,
      };
    });

    return mapped;
  }
}

type GameStatsDto = {
  [gameId: string]: {
    [playerId: string]: {
      [statId: string]: Stats;
    };
  };
};
