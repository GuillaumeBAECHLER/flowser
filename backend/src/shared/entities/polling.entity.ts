import { Column, Entity } from 'typeorm';

@Entity()
export class PollingEntity {
    @Column()
    createdAt: number = new Date().getTime();

    @Column()
    updatedAt: number;

    @Column()
    deletedAt: number;
}


