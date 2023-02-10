import {Controller,Get,Post,Put,Delete,Query,UsePipes,ValidationPipe,Body,Param,ParseIntPipe} from '@nestjs/common';
import { DoctorService } from './doctorservice.service';
import { DoctorDto } from './doctordto.dto';

@Controller('/doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  // @Get()
  // getHome(): string {
  //   return this.doctorService.getHomePage();
  // }

  // @Get('/dashboard')
  // getDashboard(): string {
  //   return this.doctorService.getDashboard();
  // }
  // @Get('id/:id')
  // getDoctorById(@Param('id') id) {
  //   return this.doctorService.getDoctorById(id);
  // }
  // @Get('name/:name')
  // getDoctorByName(@Param('name') name) {
  //   return this.doctorService.getDoctorByName(name);
  // }
  // @Post()
  // create(@Body() doctorDto: DoctorDto) {
  //   return `Id : ${doctorDto.id}
  //     Name: ${doctorDto.name}
  //     Email: ${doctorDto.email}`;
  // }

  //validation
  @Post('/signup')
  @UsePipes(ValidationPipe)
  async create(@Body() doctorDto: DoctorDto) {
    if (!doctorDto.email || !doctorDto.password) {
      return { success: false, message: 'Email and password are required' };
    }

    if (!this.validateEmail(doctorDto.email)) {
      return { success: false, message: 'Invalid email format' };
    }

    return { success: true, message: 'Doctor created successfully' };
  }

  private validateEmail(email: string) {
    const pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email); //your email must contain @ sign
  }
}
