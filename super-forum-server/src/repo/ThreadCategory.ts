import { Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
 } from "typeorm";
import { Thread } from "./Thread";
import { Auditable } from "./Auditable";

@Entity({
    name: "ThreadCategories"
})
export class ThreadCategory extends Auditable{
    @PrimaryGeneratedColumn({
        name: "Id",
        type: "bigint"
    })
    id!: string;

    @Column({
        name: "Name",
        type: "varchar",
        length: 100,
        unique: true,
        nullable: false,
    })
    name!: string;

    @Column({
        name: "Description",
        type : "varchar",
        length: 150, 
        nullable: true,
    })
    description!: string;

    @OneToMany(()=> Thread, (threads)=> threads.category)
    threads!: Thread[];
}