import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { doctorController } from "./doctor.controller";
import { DoctorService } from "./doctorservice.service";
import { DoctorEntity } from "./doctorentity.entity";


@Module({
imports: [TypeOrmModule.forFeature([DoctorEntity])],
controllers: [doctorController],
providers: [DoctorService]

})

export class DoctorModule {}