import { BlogEntity } from 'src/Blog/blogentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("doctors")
export class DoctorEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  age: number;

  @Column()
  collegeName : string;
  
  @Column()
  specialist : string;

  @Column()
  phoneNumber : string;

  @Column()
  email: string;

  @Column()
  password: string;

   @Column()
  filename: string;

  @OneToMany(() => BlogEntity, (blog) => blog.doctor)
  blogs: BlogEntity[]
}
