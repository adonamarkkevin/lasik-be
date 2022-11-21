import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from "typeorm";

@Entity({ name: "user_info" })
export class UserInfo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    user_name: string;

    @Column({ select: false, nullable: true })
    password: string;

    @Column({ default: "employee", nullable: true })
    role: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    middleName: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    civil_status: string;

    @Column({ nullable: true })
    birthday: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    contact: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deletd_at: Date;
}
