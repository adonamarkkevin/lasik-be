import {
    BaseEntity,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinColumn,
} from "typeorm";

@Entity({ name: "deparment_info" })
export class Department extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    department: string;

    @Column({ nullable: true })
    room_no: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
