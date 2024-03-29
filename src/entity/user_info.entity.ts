import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    OneToOne,
} from "typeorm";
import { Clinic } from "./clinic_branch.entity";
import { Department } from "./department.entity";
import { QueueInternal } from "./queue_internal.entity";
import { TransactionInfo } from "./transaction_info.entity";
import { TransactionService } from "./transaction_services.entity";

@Entity({ name: "user_info" })
export class UserInfo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    middleName: string;

    @Column({ nullable: true })
    user_name: string;

    @Column({ select: false, nullable: true })
    password: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    civil_status: string;

    @Column({ type: "date", nullable: true })
    birthday: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    contact: string;

    @Column({ nullable: true })
    license_number: string;

    @Column({ nullable: true })
    licence_start: string;

    @Column({ nullable: true })
    license_expires_in: string;

    @Column({ nullable: true })
    ptr_no: string;

    @Column({ nullable: true })
    ptr_eff_date: string;

    @Column({ nullable: true })
    ptr_exp_date: string;

    @Column({ nullable: true })
    s2_no: string;

    @Column({ nullable: true })
    s2_eff_date: string;

    @Column({ nullable: true })
    s2_exp_date: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => Clinic, (clinic) => clinic.user)
    @JoinColumn({ name: "clinic_id" })
    clinic: Clinic;

    @ManyToOne(() => Department, (dep) => dep.user)
    @JoinColumn({ name: "dep_id" })
    department: Department;

    @OneToMany(
        () => TransactionService,
        (assignedService) => assignedService.assigned_doctor,
    )
    assigned_service: TransactionService[];

    @OneToMany(() => TransactionInfo, (trans) => trans.patient)
    transaction_info: TransactionInfo[];

    @OneToMany(() => QueueInternal, (q) => q.patient)
    queue_internal: QueueInternal;
}
