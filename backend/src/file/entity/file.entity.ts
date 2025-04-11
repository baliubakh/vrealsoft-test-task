import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Folder } from '../../folder/entity/folder.entity';
import { User } from '../../auth/user.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uniqueName: string;

  @Column()
  name: string;

  @Column()
  filePath: string;

  @Column()
  size: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Folder, (folder) => folder.id)
  @JoinColumn({ name: 'folderId' })
  folder: Folder;

  @Column()
  folderId: number;
}
