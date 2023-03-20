import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { entityProviders } from './entity.providers';

@Module({
  providers: [...databaseProviders, ...entityProviders],
  exports: [...databaseProviders, ...entityProviders],
})
export class DatabaseModule {}