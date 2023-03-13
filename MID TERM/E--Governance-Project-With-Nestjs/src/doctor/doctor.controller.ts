import { Body,  Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Patch, Post, Put, Query, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BlogForm } from 'src/Blog/blogdto.dto';
import { BlogService } from 'src/Blog/blogservice.service';
import { DoctorEntity } from './doctorentity.entity';
import { DoctorForm } from './doctorform.dto';
import { DoctorService } from './doctorservice.service';
import { SessionGuard } from './session.guard';

@Controller('doctor')
export class doctorController {
  constructor(
    private doctorService: DoctorService,
    private blogService: BlogService
    ) {}

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
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  async updatedoctor(@Session() session, @Body('name') name: string): Promise<any> {
    const result = await this.doctorService.updateDoctor(name,session.email);
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

  //15
  @Patch('phoneNumber/:phoneNumber')
  async updateDoctorByPhoneNumber(@Body() mydto: DoctorForm, @Param('phoneNumber') phoneNumber: string) {
    const doctor = await this.doctorService.updateDoctorByPhoneNumber(mydto, phoneNumber);
    return { message: 'Doctor updated successfully', doctor };
  }


@Post('/signup')
@UseInterceptors(FileInterceptor('myfile',
{storage:diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

}))
  async signup(@Body() mydto:DoctorForm,@UploadedFile(  new ParseFilePipe({
  validators: [new MaxFileSizeValidator({ maxSize: 160000 }), new FileTypeValidator({ fileType: 'png|jpg|jpeg' }),],
}),) 
file: Express.Multer.File){
await this.doctorService.checkEmailExists(mydto.email);
mydto.filename = file.filename;  



return this.doctorService.signup(mydto);
//console.log(file)
}

  @Post('signin')
  async signIn(
    @Session() session, @Body() mydto:DoctorForm,
    @Body() { email, password }: { email: string; password: string }): Promise<any> {
    const doctor = await this.doctorService.signin(mydto);
    if (doctor) {
      return { message: 'You have successfully signed in' };
    } else {
      return { message: 'Invalid email or password' };
    }
  }

  @Get('signout')
signout(@Session() session)
{
  if(session.destroy()){return {message:"you are logged out"};}
  else{throw new UnauthorizedException("invalid actions");}
}

  @Post('sendmail')
  sendEmail(@Body() mydata){
  return this.doctorService.sendEmail(mydata);
  }

  //Blog Post

  @Post('/insertblog')
  @UsePipes(new ValidationPipe())
    insertBlog(@Body() blogdto: BlogForm): any {
      return this.blogService.insertBlog(blogdto);
    }

    @Put('/Updateblog')
    @UsePipes(new ValidationPipe())
      UpdateBlog(@Body() blogdto: DoctorForm): any {
        return this.blogService.UpdateBlog(blogdto);
      }
   
    @Get('/findblogsbydoctor/:id')
    getBlogByDoctorID(@Param('id', ParseIntPipe) id: number): any {
      return this.doctorService.getBlogByDoctorID(id);
    }

    @Get('/finddoctorbyblog/:id')
    getDoctorByBlogID(@Param('id', ParseIntPipe) id: number): any {
       return this.blogService.getBlogByDoctorID(id);
    }
}