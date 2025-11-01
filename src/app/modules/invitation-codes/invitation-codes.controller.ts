import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvitationCodesService } from './invitation-codes.service';
import { CreateInvitationCodeDto } from './dto/create-invitation-code.dto';
import { UpdateInvitationCodeDto } from './dto/update-invitation-code.dto';

@Controller('invitation-codes')
export class InvitationCodesController {
  constructor(
    private readonly invitationCodesService: InvitationCodesService,
  ) {}

  @Post()
  create(@Body() createInvitationCodeDto: CreateInvitationCodeDto) {
    return this.invitationCodesService.create(createInvitationCodeDto);
  }

  @Get()
  findAll() {
    return this.invitationCodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationCodesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvitationCodeDto: UpdateInvitationCodeDto,
  ) {
    return this.invitationCodesService.update(+id, updateInvitationCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationCodesService.remove(+id);
  }
}
