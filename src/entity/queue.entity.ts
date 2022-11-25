import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { TransactionInfo } from "./transaction_info.entity";

@Entity({ name: "queue" })
export class Queue extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    queue_number: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToOne(() => TransactionInfo, (trans) => trans.queue)
    @JoinColumn({ name: "transaction_id" })
    transaction_info: TransactionInfo;
}
