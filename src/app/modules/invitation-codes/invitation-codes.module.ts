import { Module } from '@nestjs/common';
import { InvitationCodesService } from './invitation-codes.service';
import { InvitationCodesController } from './invitation-codes.controller';

@Module({
  controllers: [InvitationCodesController],
  providers: [InvitationCodesService],
})
export class InvitationCodesModule {}
