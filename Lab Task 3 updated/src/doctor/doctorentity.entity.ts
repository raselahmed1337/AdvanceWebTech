import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("doctor")
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
  blog: string;

}