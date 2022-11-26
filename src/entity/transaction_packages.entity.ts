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
} from "typeorm";
import { TransactionInfo } from "./transaction_info.entity";
import { TransactionService } from "./transaction_services.entity";

@Entity({ name: "transaction_packcages" })
export class TransactionPackage extends BaseEntity {
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

    @ManyToMany(
        () => TransactionInfo,
        (transPack) => transPack.transaction_package,
    )
    transaction_info: TransactionInfo[];

    @ManyToMany(
        () => TransactionService,
        (transService) => transService.transaction_package,
        { cascade: true, eager: true },
    )
    @JoinTable({ name: "jointbl_transactionpckg_transactionsrvc" })
    transaction_service: TransactionService[];
}
