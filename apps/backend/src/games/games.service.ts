import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Game } from './game.schema';

@Injectable()
export class GamesService {
  constructor(@InjectModel('Game') private readonly gameModel: Model<Game>) {}

  async getAll(): Promise<Game[]> {
    return this.gameModel.find().populate('players.user').exec();
  }

  async getById(id: string): Promise<Game | null> {
    return this.gameModel.findById(id).populate('players.user').exec();
  }

  async create(gameData: Partial<Game>): Promise<Game> {
    const pin = await this.ensureUniquePin(gameData.codeToJoin);

    const newGame = new this.gameModel({
      createdAt: Date.now(),
      isGameStarted: false,
      ...gameData,
      codeToJoin: pin,
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

  async joinGame(playerId: string, codeToJoin: string): Promise<Game | null> {
    return this.gameModel
      .findOneAndUpdate(
        {
          codeToJoin: codeToJoin.toUpperCase(),
          'players.user': { $ne: playerId },
        },
        { $addToSet: { players: { user: playerId, status: 'inactive' } } },
        { new: true },
      )
      .exec();
  }

  async activatePlayer(gameId: string, playerId: string): Promise<Game | null> {
    return this.gameModel
      .findOneAndUpdate(
        { _id: gameId, 'players.user': playerId },
        { $set: { 'players.$.status': 'active' } },
        { new: true },
      )
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

  private generatePin(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  private async ensureUniquePin(proposedCode?: string): Promise<string> {
    let codeToJoin = proposedCode?.toUpperCase() || this.generatePin();
    let isUnique = false;

    while (!isUnique) {
      const existingGame = await this.gameModel.findOne({ codeToJoin }).exec();
      if (!existingGame) {
        isUnique = true;
      } else {
        codeToJoin = this.generatePin();
      }
    }

    return codeToJoin;
  }
}
