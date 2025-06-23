import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Length} from "class-validator";
import { Thread } from "./Thread";
import { ThreadItem } from "./ThreadItem";
import { ThreadItemPoint } from "./ThreadItemPoint";
import { ThreadPoint } from "./ThreadPoint";
import { Auditable } from "./Auditable";
@Entity({name: "Users"})
export class User extends Auditable{
    @PrimaryGeneratedColumn({name: "Id", type: "bigint"})
    id!: string;
    @Column({
        type: "varchar",
        name: "Email",
        length: 120,
        unique: true,
        nullable: false
    })
    email!: string;
    @Column({
        name: "UserName",
        type: "varchar",
        length: 60,
        unique: true,
        nullable: false
    })
    userName!: string;
    @Column({
        name: "Password", 
        length: 100, 
        type: "varchar",
        nullable: false
    })
    @Length(8, 100)
    password!: string;
    
    @Column({
        name: "Confirmed",
        type: "boolean",
        nullable: false,
        default: true
    })
    confirmed!: boolean;

    @Column({
        name: "isDisabled",
        type: "boolean",
        nullable: false,
        default: true
    })
    isDisabled!: boolean;
    
    @OneToMany(()=>Thread, (thread: Thread) => thread.user)
    threads!: Thread[];

    @OneToMany(()=> ThreadItem, (threadItems) => threadItems.user)
    threadItems!: ThreadItem[];

    @OneToMany(()=>ThreadItemPoint, (threadItemPoints)=> threadItemPoints.user)
    threadItemPoints!: ThreadItemPoint[];

    @OneToMany(()=>ThreadPoint, (threadPoint)=> threadPoint.user)
    threadPoints!: ThreadPoint[]
}

