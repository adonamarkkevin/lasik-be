import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    ManyToMany,
    JoinColumn,
} from "typeorm";
import { UserInfo } from "./user_info.entity";
@Entity({ name: "transaction_services" })
export class TransactionService extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column({ type: "bigint" })
    price: number;

    @Column({ type: "bigint", nullable: true })
    doctor_share: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(
        () => UserInfo,
        (assignedDoctor) => assignedDoctor.assigned_service,
    )
    @JoinColumn({ name: "doctor_id" })
    assigned_doctor: UserInfo;
}
