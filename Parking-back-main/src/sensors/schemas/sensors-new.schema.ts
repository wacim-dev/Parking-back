import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Car } from './car.interface';

export type SensorsNewDocument = SensorsNew & Document;

@Schema()
export class SensorsNew {
  @Prop()
  cars: Map<string, number>

  @Prop()
  ts: Date
}

export const SensorsNewSchema = SchemaFactory.createForClass(SensorsNew);
