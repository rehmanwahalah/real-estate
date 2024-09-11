import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { PropertyService } from '../property/property.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ActivityController],
  providers: [ActivityService, PropertyService],
  exports: [ActivityService, PropertyService],
})
export class ActivityModule {}
