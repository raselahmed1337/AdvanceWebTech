import { Module } from '@nestjs/common';
import { DoctorController } from './doctorcontroller.controller';
import { DoctorService } from './doctorservice.service';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
