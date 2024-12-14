import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

import { randomUUID } from 'crypto';
import { Document } from 'mongoose';

import { User } from '../users/user.schema';
import { Game } from '../games/game.schema';

type Position = {
  x: number;
  y: number;
  z: number;
};

@Schema()
export class Stats extends Document {
  @Prop({ required: true, type: String, default: randomUUID })
  _id: string;

  @Prop({
    required: true,
    type: String,
    ref: User.name,
  })
  player: User | string;

  @Prop({
    required: true,
    type: String,
    ref: Game.name,
  })
  game: Game | string;

  @Prop({ required: true, type: Number, default: Date.now })
  timestamp: number;

  @Prop({ required: true })
  bloodPressure: number;

  @Prop({
    required: true,
    type: raw({
      x: { type: Number },
      y: { type: Number },
      z: { type: Number },
    }),
    _id: false,
  })
  position: Position;

  @Prop({ required: true })
  bullets: number;

  @Prop({ required: true })
  health: number;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);
