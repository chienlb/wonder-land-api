import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PronunciationService } from './pronunciations.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Pronunciation')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('pronunciation')
export class PronunciationController {
  constructor(private readonly service: PronunciationService) {}

  @Post('assess')
  @UseInterceptors(FileInterceptor('audio'))
  @ApiConsumes('multipart/form-data')
  async assess(
    @UploadedFile() file: any,
    @Body('referenceText') referenceText: string,
    @Body('language') language = 'en-US',
  ) {
    if (!file?.buffer) {
      throw new BadRequestException('Missing audio file (field: audio)');
    }
    if (!referenceText?.trim()) {
      throw new BadRequestException('Missing referenceText');
    }

    return this.service.assessShortAudio({
      audioBuffer: file.buffer,
      referenceText,
      language,
    });
  }
}
