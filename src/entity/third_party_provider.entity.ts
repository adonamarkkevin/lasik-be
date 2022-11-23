import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from "typeorm";

@Entity({ name: "third_party_provider" })
export class ThirdParty extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    type: string;

    @Column()
    third_party_code: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    tel_no: string;

    @Column({ nullable: true })
    fax_no: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    tin: string;

    @Column({ nullable: true })
    contact_person1: string;

    @Column({ nullable: true })
    contact_person2: string;

    @Column({ nullable: true })
    contract_date: string;

    @Column({ nullable: true })
    contract_exp: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
