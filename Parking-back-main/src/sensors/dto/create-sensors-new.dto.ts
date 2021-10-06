import { Car } from "../schemas/car.interface";

export class CreateSensorsNewDto {
  readonly ts: Date;
  readonly cars: Map<string, number>;
}
