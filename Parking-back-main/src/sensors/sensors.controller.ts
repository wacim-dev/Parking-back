import { Body, Controller, Get, Post, Param, Logger } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorsDto } from './dto/create-sensors.dto';
import { Sensors } from './schemas/sensors.schema';
import { CreateSensorsNewDto } from './dto/create-sensors-new.dto';

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) { }

  @Post()
  async createNew(@Body() createSensorsNewDto: CreateSensorsNewDto) {
    await this.sensorsService.createNew(createSensorsNewDto);
  }


  @Post("/old")
  async create(@Body() createSensorsDto: CreateSensorsDto) {
    await this.sensorsService.create(createSensorsDto);
  }

  @Get()
  async findAll(): Promise<Sensors[]> {
    return this.sensorsService.findAll();
  }

  @Get('/reflist/date/:year/:month/:day')
  async findRefList(@Param('year') year, @Param('month') month, @Param('day') day): Promise<string[]> {
    const onlyUnique = (value, index, self) => self.indexOf(value) === index;

    return this.findDate(year, month, day)
                .then(sensors => {
                    return sensors.map(s => s.ref).filter(onlyUnique).sort()
                  });
  }

  @Get('/ref/:ref')
  async findRef(@Param('ref') ref: string): Promise<Sensors[]> {
    return this.sensorsService.findAllRef(ref);
  }

  @Get('/date/:year/:month/:day')
  async findDate(@Param('year') year, @Param('month') month, @Param('day') day): Promise<Sensors[]> {
    const y = parseInt(year);
    const m = parseInt(month);
    const d = parseInt(day);
    return this.sensorsService.findAllDate(y, m, d);
  }

  @Get('/ref/:ref/date/:year/:month/:day')
  async findDateRef(@Param('ref') ref: string, @Param('year') year, @Param('month') month, @Param('day') day): Promise<Sensors[]> {
    const y = parseInt(year);
    const m = parseInt(month);
    const d = parseInt(day);
    return this.sensorsService.findAllDateRef(ref, y, m, d);
  }
}
