import { Module } from '@nestjs/common';
import { GroupMessagesService } from './group-messages.service';
import { GroupMessagesController } from './group-messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GroupMessage,
  GroupMessageSchema,
} from './schema/group-message.schema';
import { UsersModule } from '../users/users.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GroupMessage.name, schema: GroupMessageSchema },
    ]),
    UsersModule,
    GroupsModule,
  ],
  controllers: [GroupMessagesController],
  providers: [GroupMessagesService],
  exports: [GroupMessagesService],
})
export class GroupMessagesModule { }
