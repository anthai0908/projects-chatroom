import { Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
 } from "typeorm";

import { User } from "./User";
import { ThreadItem } from "./ThreadItem";
import { Auditable } from "./Auditable";

@Entity({name: "ThreadItemPoints"})
export class ThreadItemPoint extends Auditable{
    @PrimaryGeneratedColumn({
        name: "Id", 
        type: "bigint"
    })
    id!: string;

    @Column({
        name: "IsDecrement",
        type: "boolean",
        default: false,
        nullable: false,
    })
    isDecrement!: boolean;

    @ManyToOne(()=>User, (user)=> user.threadItemPoints)
    user!: User;
    @ManyToOne(()=> ThreadItem, (threadItem)=> threadItem.threadItemPoints)
    threadItem!: ThreadItem;
}