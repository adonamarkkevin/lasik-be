import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToMany,
    JoinTable,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { Clinic } from "./clinic_branch.entity";
import { Queue } from "./queue.entity";
import { ThirdParty } from "./third_party_provider.entity";
import { TransactionPackage } from "./transaction_packages.entity";
import { TransactionService } from "./transaction_services.entity";
import { UserInfo } from "./user_info.entity";

export enum PaymentType {
    CASH = "cash",
    CARD = "card",
    CHECK = "check",
    GCASH = "GCash",
    HOMECREDIT = "Home Credit",
    BILLEASE = "Bill Ease",
    UNPAID = "unpaid",
}

@Entity({ name: "transaction_info" })
export class TransactionInfo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    referrence_num: string;

    @Column()
    transaction_type: string;

    @Column({ nullable: true })
    or_num: string;

    @Column()
    eye: string;

    @Column({ nullable: true })
    info_source: string;

    @Column({ nullable: true })
    invoice_number: string;

    @Column({ type: "enum", enum: PaymentType, nullable: true })
    payment_type: PaymentType;

    @Column({ type: "bigint", nullable: true })
    paid_amount: number;

    @Column({ nullable: true })
    card_no: string;

    @Column({ nullable: true })
    card_type: string;

    @Column({ nullable: true })
    card_company: string;

    @Column({ nullable: true })
    card_holder_name: string;

    @Column({ nullable: true })
    card_approval_code: string;

    @Column({ nullable: true })
    check_issued_date: string;

    @Column({ nullable: true })
    check_bank: string;

    @Column({ nullable: true })
    check_branch: string;

    @Column({ nullable: true })
    check_no: string;

    @Column({ nullable: true })
    gcash_referrence: string;

    @Column({ nullable: true })
    home_credit_order_id: string;

    @Column({ nullable: true })
    bill_ease_order_id: string;

    @Column({ nullable: true })
    payment_date: string;

    @Column({ type: "bigint", nullable: true })
    total: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => ThirdParty, (tpp) => tpp.transaction_info)
    @JoinColumn({ name: "tpp_id" })
    third_party_provider: ThirdParty;

    @ManyToOne(() => UserInfo, (user) => user.transaction_info)
    @JoinColumn({ name: "patient_id" })
    patient: UserInfo;

    @ManyToMany(
        () => TransactionPackage,
        (transpack) => transpack.transaction_info,
        { cascade: true, onDelete: "CASCADE" },
    )
    @JoinTable({ name: "jointbl_transactions_packages" })
    transaction_package: TransactionPackage[];

    @ManyToMany(
        () => TransactionService,
        (transService) => transService.transaction_info,
        { cascade: true, onDelete: "CASCADE" },
    )
    @JoinTable({ name: "jointbl_transactions_services" })
    transaction_service: TransactionService[];

    @ManyToOne(() => Clinic, (clinic) => clinic.transaction_info)
    @JoinColumn({ name: "clinic_id" })
    clinic: Clinic;

    @OneToOne(() => Queue, (q) => q.transaction_info)
    queue: Queue;
}
