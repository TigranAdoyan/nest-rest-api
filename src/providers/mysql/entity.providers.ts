import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const entityProviders = [
  {
    provide: User.repoName,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
