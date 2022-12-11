import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from "typeorm";

@Entity({ name: "discount" })
export class Discount extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    discount_code: string;

    @Column()
    discount_name: string;

    @Column({ type: "decimal", precision: 11, scale: 2 })
    rate: number;

    @Column({ type: "tinyint", width: 1, default: false })
    is_percent?: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
