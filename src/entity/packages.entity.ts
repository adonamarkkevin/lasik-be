import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from "typeorm";

import { Service } from "./services.entity";

@Entity({ name: "packages" })
export class Packcage extends BaseEntity {
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

    @ManyToMany(() => Service, (service) => service.package)
    @JoinTable({ name: "jointbl_services_packcages" })
    service: Service[];
}
