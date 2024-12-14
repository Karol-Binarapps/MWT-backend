import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Game } from './game.schema';

@Injectable()
export class GamesService {
  constructor(@InjectModel('Game') private readonly gameModel: Model<Game>) {}

  async getAll(): Promise<Game[]> {
    return this.gameModel.find().populate('players').exec();
  }

  async getById(id: string): Promise<Game | null> {
    return this.gameModel.findById(id).populate('players').exec();
  }

  async create(gameData: Partial<Game>): Promise<Game> {
    const newGame = new this.gameModel({
      createdAt: Date.now(),
      isGameStarted: false,
      ...gameData,
    });
    return newGame.save();
  }

  async update(id: string, gameData: Partial<Game>): Promise<Game | null> {
    return this.gameModel.findByIdAndUpdate(id, gameData, { new: true }).exec();
  }

  async delete(id: string): Promise<Game | null> {
    return this.gameModel.findByIdAndDelete(id).exec();
  }

  async startGame(id: string): Promise<Game | null> {
    return this.gameModel
      .findByIdAndUpdate(id, { isGameStarted: true }, { new: true })
      .exec();
  }

  async endGame(id: string): Promise<Game | null> {
    return this.gameModel
      .findByIdAndUpdate(id, { isGameStarted: false }, { new: true })
      .exec();
  }

  async addPlayer(id: string, playerId: string): Promise<Game | null> {
    return this.gameModel
      .findByIdAndUpdate(id, { $push: { players: playerId } }, { new: true })
      .exec();
  }

  async getGameWithPlayerStats(gameId: string): Promise<any> {
    const result = await this.gameModel.aggregate([
      { $match: { _id: gameId } },
      {
        $lookup: {
          from: 'users',
          localField: 'players',
          foreignField: '_id',
          as: 'players',
          pipeline: [
            {
              $lookup: {
                from: 'stats',
                localField: '_id',
                foreignField: 'player',
                as: 'stats',
              },
            },
          ],
        },
      },
    ]);

    const game = result.reduce((_acc, game) => game, null);

    const gameWithPlayerStats = game && {
      [game._id]: game.players.reduce((acc, player) => {
        acc[player._id] = player.stats.reduce((statsAcc, stat) => {
          statsAcc[stat._id] = stat;
          return statsAcc;
        }, {});
        return acc;
      }, {}),
    };

    return gameWithPlayerStats;
    // return game;
  }
}
