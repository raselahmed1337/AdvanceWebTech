import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctormodule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    DoctorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
