import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApplicationDocument = Application & Document;

@Schema()
export class Application {
  @Prop({ required: true, unique: true })
  user_id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: number; // 0-web类型  1-小程序类型  2-server类型

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
