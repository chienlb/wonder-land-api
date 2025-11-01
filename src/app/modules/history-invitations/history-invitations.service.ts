import { Injectable } from '@nestjs/common';
import { CreateHistoryInvitationDto } from './dto/create-history-invitation.dto';
import { UpdateHistoryInvitationDto } from './dto/update-history-invitation.dto';

@Injectable()
export class HistoryInvitationsService {
  create(createHistoryInvitationDto: CreateHistoryInvitationDto) {
    return 'This action adds a new historyInvitation';
  }

  findAll() {
    return `This action returns all historyInvitations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historyInvitation`;
  }

  update(id: number, updateHistoryInvitationDto: UpdateHistoryInvitationDto) {
    return `This action updates a #${id} historyInvitation`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyInvitation`;
  }
}
