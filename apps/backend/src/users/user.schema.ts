import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { randomUUID } from 'crypto';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, type: String, default: randomUUID })
  _id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false })
  nickName: string;

  @Prop({ required: true })
  userClass: string;

  @Prop({ required: true })
  team: string;

  @Prop({ required: true })
  userRank: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  avatarBase64: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
