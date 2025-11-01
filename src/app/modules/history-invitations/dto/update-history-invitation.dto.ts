import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryInvitationDto } from './create-history-invitation.dto';

export class UpdateHistoryInvitationDto extends PartialType(
  CreateHistoryInvitationDto,
) {}
