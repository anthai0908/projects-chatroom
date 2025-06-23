import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Length } from "class-validator";
import { Thread } from "./Thread";
import { User } from "./User"
import {ThreadItemPoint} from "./ThreadItemPoint"
import { Auditable } from "./Auditable";

@Entity({
    name: "ThreadItems", 
})
export class ThreadItem extends Auditable{
    @PrimaryGeneratedColumn({
        name: "Id",
        type: "bigint",
        
    })
    id!: string;

    @Column({
        name: "Views",
        type: "int",
        default: 0, 
        nullable: false
    })
    views! : number;

    @Column({
        name: "Points", 
        type: "int", 
        default: 0,
        nullable: false
    })
    points!: number;

    @Column({
        name: "IsDisabled",
        type: "boolean",
        default: false,
        nullable: false
    })
    isDisabled!: boolean;

    @Column({
        name: "Body",
        type: "varchar",
        length: 2500,
        nullable: true
    })
    @Length(10,2500)
    body!: string;

    @OneToMany(()=>ThreadItemPoint, (threadItemPoints)=> threadItemPoints.threadItem)
    threadItemPoints!: ThreadItemPoint[];

    @ManyToOne(()=>User, (user)=>user.threadItems)
    user!: User;

    @ManyToOne(()=>Thread, (thread)=> thread.threadItems)
    thread!: Thread;
}