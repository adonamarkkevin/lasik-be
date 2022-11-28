import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from "typeorm";
import { ThirdParty } from "./third_party_provider.entity";
import { TransactionInfo } from "./transaction_info.entity";

@Entity({ name: "patient_classes" })
export class PatientClass extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => ThirdParty, (tpp) => tpp.patient_class)
    tpp: ThirdParty[];

    @OneToMany(() => TransactionInfo, (t) => t.patient_class)
    transaction_info: TransactionInfo[];
}
