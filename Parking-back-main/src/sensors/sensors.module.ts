import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorsController } from './sensors.controller';
import { SensorsService } from './sensors.service';
import { Sensors, SensorsSchema } from './schemas/sensors.schema';
import { SensorsNew, SensorsNewSchema } from './schemas/sensors-new.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Sensors.name, schema: SensorsSchema },
    { name: SensorsNew.name, schema: SensorsNewSchema }
  ])],
  controllers: [SensorsController],
  providers: [SensorsService],
})
export class SensorsModule {}
