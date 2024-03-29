import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { PatientClass } from "./patient_class.entity";
import { TransactionInfo } from "./transaction_info.entity";

@Entity({ name: "third_party_provider" })
export class ThirdParty extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    third_party_code: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    tel_no: string;

    @Column({ nullable: true })
    fax_no: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    tin: string;

    @Column({ nullable: true })
    contact_person1: string;

    @Column({ nullable: true })
    contact_person2: string;

    @Column({ type: "date", nullable: true })
    contract_date: string;

    @Column({ type: "date", nullable: true })
    contract_exp: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => PatientClass, (pClass) => pClass.tpp)
    @JoinColumn({ name: "patient_class_id" })
    patient_class: PatientClass;

    @OneToMany(() => TransactionInfo, (trans) => trans.third_party_provider)
    transaction_info: TransactionInfo[];
}
