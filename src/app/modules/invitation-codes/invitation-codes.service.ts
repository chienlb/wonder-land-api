import { Injectable } from '@nestjs/common';
import { CreateInvitationCodeDto } from './dto/create-invitation-code.dto';
import { UpdateInvitationCodeDto } from './dto/update-invitation-code.dto';

@Injectable()
export class InvitationCodesService {
  create(createInvitationCodeDto: CreateInvitationCodeDto) {
    return 'This action adds a new invitationCode';
  }

  findAll() {
    return `This action returns all invitationCodes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invitationCode`;
  }

  update(id: number, updateInvitationCodeDto: UpdateInvitationCodeDto) {
    return `This action updates a #${id} invitationCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} invitationCode`;
  }
}
