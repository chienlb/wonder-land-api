import { Module } from '@nestjs/common';
import { HistoryInvitationsService } from './history-invitations.service';
import { HistoryInvitationsController } from './history-invitations.controller';

@Module({
  controllers: [HistoryInvitationsController],
  providers: [HistoryInvitationsService],
})
export class HistoryInvitationsModule {}
