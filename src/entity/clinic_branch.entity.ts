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
import { TransactionInfo } from "./transaction_info.entity";
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

    @Column({ nullable: true })
    tel_no: string;

    @Column({ nullable: true })
    mobile_no: string;

    @Column({ nullable: true })
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => UserInfo, (user) => user.clinic)
    user: UserInfo[];

    @OneToMany(() => TransactionInfo, (trans) => trans.clinic)
    transaction_info: TransactionInfo[];
}
