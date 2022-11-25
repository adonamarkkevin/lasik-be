import {
    BaseEntity,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinColumn,
} from "typeorm";
import { Service } from "./services.entity";
import { UserInfo } from "./user_info.entity";

@Entity({ name: "deparment_info" })
export class Department extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    department: string;

    @Column({ nullable: true })
    room_no: string;

    @Column({ type: "tinyint", width: 1, default: true })
    for_viewing?: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => UserInfo, (user) => user.department)
    user: UserInfo[];

    @OneToMany(() => Service, (srvc) => srvc.department)
    service: Service[];
}
