import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToMany,
} from "typeorm";
import { Packcage } from "./packages.entity";
import { PatientVisit } from "./patient_visit.entity";
@Entity({ name: "services" })
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column({ type: "bigint" })
    price: number;

    @Column({ type: "bigint", nullable: true })
    facility_fee: number;

    @Column({ type: "bigint", nullable: true })
    doctor_share: number;

    @Column({ type: "bigint", nullable: true })
    professional_share: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToMany(() => Packcage, (pack) => pack.service)
    package: Packcage[];

    @ManyToMany(() => PatientVisit, (visit) => visit.service)
    patient_visit: PatientVisit[];
}
