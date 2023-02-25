import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctormodule.module';


@Module({
  imports: [DoctorModule, TypeOrmModule.forRoot(
   { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'doctordb',
    autoLoadEntities: true,
    synchronize: true,
  }
  ),],
  controllers: [],
  providers: [],
})
export class AppModule {}