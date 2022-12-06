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
import { TransactionService } from "./transaction_services.entity";
import { UserInfo } from "./user_info.entity";

@Entity({ name: "queue_internal" })
export class QueueInternal extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    queue_number: string;

    @Column({ default: "ON QUEUE" }) // ON QUEUE, ON PROCESS, DONE
    queue_status: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToOne(() => TransactionService, (ts) => ts.queue_internal)
    @JoinColumn({ name: "service_id" })
    transaction_service: TransactionService;

    @OneToOne(() => UserInfo, (user) => user.queue_internal)
    @JoinColumn({ name: "patient_id" })
    patient: UserInfo;
}
