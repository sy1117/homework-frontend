import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, BeforeUpdate, AfterInsert, AfterUpdate, BaseEntity, Generated} from "typeorm";

@Entity()
export class Event extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"text"})
    title: string;

    @Column({type:"datetime"})
    datetime : Date;

    @CreateDateColumn() createdAt: string;
}
