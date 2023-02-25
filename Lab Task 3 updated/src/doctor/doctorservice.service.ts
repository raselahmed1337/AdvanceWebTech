import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from './doctorentity.entity';
import { DoctorForm } from './doctorform.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>,
  ) {}

  //1
  getAllDoctor(): any {
    return this.doctorRepo.find();
  }

  //2
  getDoctorByID(id): any {
    return this.doctorRepo.findOneBy({ id });
  }

  //3
  getDoctorByIDName(qry): any {
    return this.doctorRepo.findOneBy({ id: qry.id, name: qry.name });
  }
  //4
  getDoctorsBySpecialist(specialist: string): any {
    return this.doctorRepo.find({ where: { specialist } });
  }

  //5
  getDoctorsByCollege(collegeName: string): any {
    return this.doctorRepo.find({ where: { collegeName } });
  }

  //6
  getDoctorByEmail(email: string): any {
    return this.doctorRepo.findOne({ where: { email } });
  }

  //7
  getDoctorByPhoneNumber(phoneNumber: string): any {
    return this.doctorRepo.findOneBy({ phoneNumber });
  }
  //8
  insertDoctor(mydto: DoctorForm): any {
    const doctoraccount = new DoctorEntity();
    doctoraccount.name = mydto.name;
    doctoraccount.age = mydto.age;
    doctoraccount.collegeName = mydto.collegeName;
    doctoraccount.specialist = mydto.specialist;
    doctoraccount.phoneNumber = mydto.phoneNumber;
    doctoraccount.email = mydto.email;
    doctoraccount.password = mydto.password;
    doctoraccount.blog = mydto.blog;
    return this.doctorRepo.save(doctoraccount);
  }

  //9
  updateDoctor(name, id): any {
    console.log(name + id);
    return this.doctorRepo.update(id, { name: name });
  }

  //10
  updateDoctorbyid(mydto: DoctorForm, id): any {
    return this.doctorRepo.update(id, mydto);
  }

  //11
  deleteDoctorbyid(id): any {
    return this.doctorRepo.delete(id);
  }

  //12
  // deleteAllDoctors(): any {
  //   return this.doctorRepo.delete({});
  // }

  //13
  async getAllDoctorsSortedByName(): Promise<any> {
    return this.doctorRepo.find({ order: { name: 'ASC' } });
  }

  //14
  async getTotalDoctors(): Promise<any> {
    return this.doctorRepo.count();
  }
}
