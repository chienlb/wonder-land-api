import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistoryInvitationsService } from './history-invitations.service';
import { CreateHistoryInvitationDto } from './dto/create-history-invitation.dto';
import { UpdateHistoryInvitationDto } from './dto/update-history-invitation.dto';

@Controller('history-invitations')
export class HistoryInvitationsController {
  constructor(
    private readonly historyInvitationsService: HistoryInvitationsService,
  ) {}

  @Post()
  create(@Body() createHistoryInvitationDto: CreateHistoryInvitationDto) {
    return this.historyInvitationsService.create(createHistoryInvitationDto);
  }

  @Get()
  findAll() {
    return this.historyInvitationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyInvitationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHistoryInvitationDto: UpdateHistoryInvitationDto,
  ) {
    return this.historyInvitationsService.update(
      +id,
      updateHistoryInvitationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyInvitationsService.remove(+id);
  }
}
