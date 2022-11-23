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
} from "typeorm";
import { Clinic } from "./clinic_branch.entity";
import { TransactionService } from "./transaction_services.entity";

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
    deletd_at: Date;

    @ManyToOne(() => Clinic, (clinic) => clinic.user)
    @JoinColumn({ name: "clinicId" })
    clinic: Clinic;

    @OneToMany(
        () => TransactionService,
        (assignedService) => assignedService.assigned_doctor,
    )
    assigned_service: TransactionService[];
}
