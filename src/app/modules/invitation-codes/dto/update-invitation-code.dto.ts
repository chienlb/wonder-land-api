import { PartialType } from '@nestjs/mapped-types';
import { CreateInvitationCodeDto } from './create-invitation-code.dto';

export class UpdateInvitationCodeDto extends PartialType(
  CreateInvitationCodeDto,
) {}
