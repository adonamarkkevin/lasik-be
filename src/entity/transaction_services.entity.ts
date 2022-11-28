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
    ManyToMany,
    OneToOne,
} from "typeorm";
import { QueueInternal } from "./queue_internal.entity";
import { TransactionInfo } from "./transaction_info.entity";
import { TransactionPackage } from "./transaction_packages.entity";
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
    discount_amount: number;

    @Column({ type: "bigint", nullable: true })
    facility_fee: number;

    @Column({ type: "bigint", nullable: true })
    doctor_share: number;

    @Column({ type: "bigint", nullable: true })
    professional_share: number;

    @Column({ type: "bigint", nullable: true })
    amount_paid: number;

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

    @ManyToMany(
        () => TransactionInfo,
        (transInfo) => transInfo.transaction_service,
    )
    transaction_info: TransactionInfo[];

    @ManyToMany(
        () => TransactionPackage,
        (transPckg) => transPckg.transaction_service,
    )
    transaction_package: TransactionPackage[];

    @OneToOne(() => QueueInternal, (q) => q.transaction_service)
    queue_internal: QueueInternal;
}
