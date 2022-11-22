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

    @Column({ type: "decimal", precision: 11, scale: 2 })
    price: number;

    @Column({ type: "decimal", precision: 11, scale: 2, nullable: true })
    facility_fee: number;

    @Column({ type: "decimal", precision: 11, scale: 2, nullable: true })
    doctor_share: number;

    @Column({ type: "decimal", precision: 11, scale: 2, nullable: true })
    professional_share: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToMany(() => Service, (service) => service.package)
    @JoinTable({ name: "services_packcages" })
    service: Service[];
}
