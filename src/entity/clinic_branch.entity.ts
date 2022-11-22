import {
    Column,
    BaseEntity,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";
import { UserInfo } from "./user_info.entity";

@Entity({ name: "clinic" })
export class Clinic extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hosp_code: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    city_municipality: string;

    @Column()
    province: string;

    @Column()
    zip_code: string;

    @Column()
    tel_no: string;

    @Column()
    mobile_no: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => UserInfo, (user) => user.clinic)
    user: UserInfo[];
}
