import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogEntity } from "./blogentity.entity";



@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogEntity)
        private blogRepo: Repository<BlogEntity>,
      ) {}


insertBlog(mydto):any {
    
   return this.blogRepo.save(mydto);
      }
      getBlogByDoctorID(id):any {
        return this.blogRepo.find({ 
                where: {id:id},
            relations: {
                doctor: true,
            },
         });
    }

    UpdateBlog(mydto):any {
    
        return this.blogRepo.save(mydto);
           }
           UpdateBlogByDoctorID(id):any {
             return this.blogRepo.find({ 
                     where: {id:id},
                 relations: {
                     doctor: true,
                 },
              });
         }
}