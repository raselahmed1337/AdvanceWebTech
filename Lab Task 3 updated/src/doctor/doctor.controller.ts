import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DoctorForm } from './doctorform.dto';
import { DoctorService } from './doctorservice.service';

@Controller('/doctor')
export class doctorController {
  constructor(private doctorService: DoctorService) {}

  //1
  @Get('/alldoctors')
  getAllDoctor(): any {
    return this.doctorService.getAllDoctor();
  }

  //2
  @Get('/finddoctor/:id')
  getdoctorByID(@Param('id', ParseIntPipe) id: string): any {
    return this.doctorService.getDoctorByID(id);
  }

  //3
  @Get('finddoctorbyidname')
  async getDoctorByIDName(
    @Query('id') id: number,
    @Query('name') name: string,
  ): Promise<any> {
    const doctor = await this.doctorService.getDoctorByIDName({ id, name });
    if (!doctor) {
      return { message: 'No doctor found with the given id and name.' };
    }
    return doctor;
  }

  //4
  @Get('specialist/:specialist')
  async getDoctorsBySpecialist(
    @Param('specialist') specialist: string,
  ): Promise<any> {
    const doctors = await this.doctorService.getDoctorsBySpecialist(specialist);
    if (!doctors || doctors.length === 0) {
      return 'No doctors found for the given specialist.';
    }
    return doctors;
  }
  //5
  @Get('college/:collegeName')
  getDoctorsByCollege(@Param('collegeName') collegeName: string): Promise<any> {
    return this.doctorService.getDoctorsByCollege(collegeName);
  }
  //6
  @Get('email/:email')
  async getDoctorByEmail(@Param('email') email: string): Promise<any> {
    const doctor = await this.doctorService.getDoctorByEmail(email);
    if (!doctor) {
      return { message: 'No doctor found with the given email.' };
    }
    return doctor;
  }
  //7
  @Get('phone/:phoneNumber')
  async getDoctorByPhoneNumber(
    @Param('phoneNumber') phoneNumber: string,
  ): Promise<any> {
    const doctor = await this.doctorService.getDoctorByPhoneNumber(phoneNumber);
    if (!doctor) {
      return { message: 'No doctor found with the given phone number.' };
    }
    return doctor;
  }
  //8
  @Post('/insertdoctor')
  @UsePipes(new ValidationPipe())
  insertdoctor(@Body() mydto: DoctorForm): any {
    return this.doctorService.insertDoctor(mydto);
  }

  //9
  @Put('/updatedoctor')
  @UsePipes(new ValidationPipe())
  async updatedoctor(
    @Body('name') name: string,
    @Body('id') id: number,
  ): Promise<any> {
    const result = await this.doctorService.updateDoctor(name, id);
    if (result.affected === 1) {
      return 'Record updated successfully';
    } else {
      return 'Record not found';
    }
  }
  //10
  @Put('/updatedoctor/:id')
  @UsePipes(new ValidationPipe())
  async updatedoctorbyid(
    @Body() mydto: DoctorForm,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const result = await this.doctorService.updateDoctorbyid(mydto, id);
    if (result.affected === 1) {
      return 'Record updated successfully';
    } else {
      return 'Record not found';
    }
  }
  //11
  @Delete('/deletedoctor/:id')
  async deletedoctorbyid(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const result = await this.doctorService.deleteDoctorbyid(id);
    if (result.affected === 1) {
      return 'Record ' + id + ' deleted successfully';
    } else {
      return 'Record not found';
    }
  }
  //12
  // @Delete('deletealldoctor')
  // deleteAllDoctors(): Promise<any> {
  //   return this.doctorService.deleteAllDoctors();
  // }

  //13
  @Get('doctorsbyname')
  async getAllDoctorsSortedByName(): Promise<any> {
    return this.doctorService.getAllDoctorsSortedByName();
  }

  //14
  @Get('totaldoctors')
  async getTotalDoctors(): Promise<any> {
    const total = await this.doctorService.getTotalDoctors();
    return 'Total number of doctors: ' + total;
  }
}
