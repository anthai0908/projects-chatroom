import {Column, BaseEntity} from "typeorm";

export class Auditable extends BaseEntity{
    @Column({
        name: "CreatedBy",
        type: "varchar",
        length: 60,
        default: ()=>`getpgusername()`,
        nullable: false,
    })
    createdBy!: string;
    @Column({
        name: "createdOn",
        type: "timestamp without time zone",
        default: ()=>`now()`,
        nullable: false,
    })
    createdOn!: Date;
    @Column({
        name: "LastModifiedBy",
        type: "varchar",
        length: 60,
        default: () => `getpgusername()`,
        nullable: false,
    })
    lastModifiedBy!: string;
    @Column({
        name: "LastModifiedOn",
        type: "timestamp without time zone",
        default: () => `now()`,
        nullable: false,
    })
    lastModifiedOn!: Date;
}