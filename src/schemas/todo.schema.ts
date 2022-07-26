import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ versionKey: false })
export class Todo {
  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
