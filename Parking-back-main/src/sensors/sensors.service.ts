import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSensorsNewDto } from './dto/create-sensors-new.dto';
import { CreateSensorsDto } from './dto/create-sensors.dto';
import { SensorsNew, SensorsNewDocument } from './schemas/sensors-new.schema';
import { Sensors, SensorsDocument } from './schemas/sensors.schema';

@Injectable()
export class SensorsService {
  constructor(
    @InjectModel(Sensors.name) private readonly sensorsModel: Model<SensorsDocument>,
    @InjectModel(SensorsNew.name) private readonly sensorsNewModel: Model<SensorsNewDocument>
  ) {}

  async create(createSensorsDto: CreateSensorsDto): Promise<Sensors> {
    console.log("--> create old")
    const createdSensors = new this.sensorsModel(createSensorsDto);
    return createdSensors.save();
  }

  async createNew(createSensorsNewDto: CreateSensorsNewDto): Promise<SensorsNew> {
    console.log("--> create new")
    const createdNewSensors = new this.sensorsNewModel(createSensorsNewDto);
    const date = new Date();
    Object.keys(createSensorsNewDto.cars).forEach(key => {
      const createSensorsDto = new CreateSensorsDto();
      createSensorsDto.date = date;
      createSensorsDto.isPresent = parseInt(createSensorsNewDto.cars[key]);
      createSensorsDto.ref = key;
      this.create(createSensorsDto).then();
    })

    return createdNewSensors.save();
  }

  async findAll(): Promise<Sensors[]> {
    return this.sensorsModel.find().sort({ date: 1 }).exec();
  }

  async findAllRef(ref: string): Promise<Sensors[]> {
    return this.sensorsModel.find({ref: ref}).sort({ date: 1 }).exec();
  }

  async findAllDate(year: number, month:number, day: number): Promise<Sensors[]> {
    const startDate = new Date(`${year}-${month}-${day}`);
    startDate.setUTCHours(0);
    const DAY = 60 * 60 * 24 * 1000;
    const endDate = new Date(startDate.getTime() + DAY);
    return this.sensorsModel.find({date: { $gte: startDate, $lt: endDate }}).sort({ date: 1 }).exec();
  }

  async findAllDateRef(ref: string, year: number, month:number, day: number): Promise<Sensors[]> {
    const startDate = new Date(`${year}-${month}-${day}`);
    startDate.setUTCHours(0);
    const DAY = 60 * 60 * 24 * 1000;
    const endDate = new Date(startDate.getTime() + DAY);
    return this.sensorsModel.find({ref: ref, date: { $gte: startDate, $lt: endDate }}).sort({ date: 1 }).exec();
  }
}
