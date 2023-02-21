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

  getIndex(): any {
    return this.doctorRepo.find();
  }
  getDoctorByID(id): any {
    return this.doctorRepo.findOneBy({ id });
  }

  getDoctorByIDName(qry): any {
    return this.doctorRepo.findOneBy({ id: qry.id, name: qry.name });
  }

  insertDoctor(mydto: DoctorForm): any {
    const doctoraccount = new DoctorEntity();
    doctoraccount.name = mydto.name;
    doctoraccount.email = mydto.email;
    doctoraccount.password = mydto.password;
    doctoraccount.address = mydto.address;
    return this.doctorRepo.save(mydto);
  }

  updateDoctor(name, id): any {
    console.log(name + id);
    return this.doctorRepo.update(id, { name: name });
  }
  updateDoctorbyid(mydto: DoctorForm, id): any {
    return this.doctorRepo.update(id, mydto);
  }
  deleteDoctorbyid(id): any {
    return this.doctorRepo.delete(id);
  }
}
