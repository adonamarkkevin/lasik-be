import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToMany,
    JoinTable,
    OneToOne,
} from "typeorm";
import { Clinic } from "./clinic_branch.entity";
import { Packcage } from "./packages.entity";
import { Service } from "./services.entity";
import { ThirdParty } from "./third_party_provider.entity";
import { UserInfo } from "./user_info.entity";

@Entity({ name: "patient_visits" })
export class PatientVisit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pin: string;

    @Column({ nullable: true })
    remarks: string;

    @Column({ nullable: true })
    info_source: string;

    @Column({ nullable: true })
    eye: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToMany(() => Packcage, (pckage) => pckage.patient_visit)
    @JoinTable({ name: "jointbl_visits_packages" })
    package: Packcage[];

    @ManyToMany(() => Service, (service) => service.patient_visit)
    @JoinTable({ name: "jointbl_visits_services" })
    service: Service[];

    @ManyToOne(() => UserInfo, (user) => user.patient_visit)
    @JoinColumn({ name: "patient_id" })
    patient: UserInfo;

    @ManyToOne(() => Clinic, (clinic) => clinic.patient_visit)
    @JoinColumn({ name: "clinic_id" })
    clinic: Clinic;

    @ManyToOne(() => ThirdParty, (tpp) => tpp.patient_visit)
    @JoinColumn({ name: "tpp_id" })
    third_party_provider: ThirdParty;
}
