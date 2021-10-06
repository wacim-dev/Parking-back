import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SensorsDocument = Sensors & Document;

@Schema()
export class Sensors {
  @Prop()
  ref: string;

  @Prop()
  isPresent: number;

  @Prop()
  date: Date
}

export const SensorsSchema = SchemaFactory.createForClass(Sensors);
