import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum SeverityLevel {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low'
}

@Entity('LogModel')
export class LogModel {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({type: 'text' })
  message: string = '';

  @Column({ type: 'enum', enum: SeverityLevel, default: SeverityLevel.LOW })
  level: string = '';

  @Column({ type: 'text'})
  origin: string = '';

  @Column({ type: 'timestamp', default: new Date() })
  createdAt: Date = new Date();
}
