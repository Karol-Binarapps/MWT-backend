import { User } from '../users/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { raw } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

type Player = {
  user: User | string;
  status: string;
};

@Schema()
export class Game extends Document {
  @Prop({ required: true, type: String, default: randomUUID })
  _id: string;

  @Prop({
    required: true,
    type: raw([
      {
        user: { type: String, ref: User.name },
        status: { type: String },
      },
    ]),
    _id: false,
  })
  players: Player[];

  @Prop({ required: true })
  createdAt: number;

  @Prop({ required: true, unique: true })
  codeToJoin: string;

  @Prop({ required: true })
  isGameStarted: boolean;

  @Prop({ required: true })
  mode: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
