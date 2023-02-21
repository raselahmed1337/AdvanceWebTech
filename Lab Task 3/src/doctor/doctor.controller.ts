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

  @Get('/index')
  getdoctor(): any {
    return this.doctorService.getIndex();
  }

  @Get('/finddoctor/:id')
  getdoctorByID(@Param('id', ParseIntPipe) id: number): any {
    return this.doctorService.getDoctorByID(id);
  }

  @Get('/finddoctor')
  getdoctorByIDName(@Query() qry: any): any {
    return this.doctorService.getDoctorByIDName(qry);
  }
  @Post('/insertdoctor')
  @UsePipes(new ValidationPipe())
  insertdoctor(@Body() mydto: DoctorForm): any {
    return this.doctorService.insertDoctor(mydto);
  }

  @Put('/updatedoctor')
  @UsePipes(new ValidationPipe())
  async updatedoctor(@Body('name') name: string, @Body('id') id: number): Promise<any> {
    const result = await this.doctorService.updateDoctor(name, id);
    if (result.affected === 1) {
      return 'Record updated successfully';
    } else {
      return 'Record not found';
    }
  }

  @Put('/updatedoctor/:id')
  @UsePipes(new ValidationPipe())
  async updatedoctorbyid(@Body() mydto: DoctorForm, @Param('id', ParseIntPipe) id: number): Promise<any> {
    const result = await this.doctorService.updateDoctorbyid(mydto, id);
    if (result.affected === 1) {
      return 'Record updated successfully';
    } else {
      return 'Record not found';
    }
  }

  @Delete('/deletedoctor/:id')
  async deletedoctorbyid(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const result = await this.doctorService.deleteDoctorbyid(id);
    if (result.affected === 1) {
      return 'Record ' + id +' deleted successfully';
    } else {
      return 'Record not found';
    }
  }
}
