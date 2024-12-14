import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { randomUUID } from 'crypto';
import { Document } from 'mongoose';

import { User } from '../users/user.schema';

@Schema()
export class Game extends Document {
  @Prop({ required: true, type: String, default: randomUUID })
  _id: string;

  @Prop({ required: false, type: [String], ref: User.name })
  players?: User[] | string[];

  @Prop({ required: true })
  createdAt: number;

  @Prop({ required: true })
  codeToJoin: string;

  @Prop({ required: true })
  isGameStarted: boolean;

  @Prop({ required: true })
  mode: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
