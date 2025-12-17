import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/app/common/guards/role.guard';
import { Roles } from 'src/app/common/decorators/role.decorator';
import { PronunciationsService } from './pronunciations.service';
import { CreatePronunciationExerciseDto } from './dto/create-pronunciation-exercise.dto';
import { UpdatePronunciationExerciseDto } from './dto/update-pronunciation-exercise.dto';
import { SubmitPronunciationAttemptDto } from './dto/submit-pronunciation-attempt.dto';
import { UserRole } from '../users/schema/user.schema';

@ApiTags('Pronunciations')
@Controller('pronunciations')
export class PronunciationsController {
  constructor(
    private readonly pronunciationsService: PronunciationsService,
  ) { }

  /**
   * Tạo bài tập phát âm mới (Admin/Teacher)
   */
  @Post('exercises')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create pronunciation exercise' })
  @ApiResponse({ status: 201, description: 'Exercise created successfully' })
  async createExercise(@Body() createDto: CreatePronunciationExerciseDto) {
    return this.pronunciationsService.createExercise(createDto);
  }

  /**
   * Cập nhật bài tập (Admin/Teacher)
   */
  @Put('exercises/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update pronunciation exercise' })
  @ApiResponse({ status: 200, description: 'Exercise updated successfully' })
  async updateExercise(
    @Param('id') id: string,
    @Body() updateDto: UpdatePronunciationExerciseDto,
  ) {
    return this.pronunciationsService.updateExercise(id, updateDto);
  }

  /**
   * Xóa bài tập (Admin/Teacher)
   */
  @Delete('exercises/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete pronunciation exercise' })
  @ApiResponse({ status: 200, description: 'Exercise deleted successfully' })
  @HttpCode(HttpStatus.OK)
  async deleteExercise(@Param('id') id: string) {
    await this.pronunciationsService.deleteExercise(id);
    return { message: 'Exercise deleted successfully' };
  }

  /**
   * Lấy danh sách bài tập
   */
  @Get('exercises')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all pronunciation exercises' })
  @ApiResponse({ status: 200, description: 'List of exercises' })
  async findAllExercises(
    @Query('lessonId') lessonId?: string,
    @Query('unitId') unitId?: string,
    @Query('level') level?: string,
    @Query('difficulty') difficulty?: string,
    @Query('topic') topic?: string,
    @Query('tags') tags?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const filters = {
      lessonId,
      unitId,
      level,
      difficulty,
      topic,
      tags: tags ? tags.split(',') : undefined,
    };

    return this.pronunciationsService.findAllExercises(
      filters,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
    );
  }

  /**
   * Lấy chi tiết bài tập
   */
  @Get('exercises/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get pronunciation exercise by ID' })
  @ApiResponse({ status: 200, description: 'Exercise details' })
  async findExerciseById(@Param('id') id: string) {
    return this.pronunciationsService.findExerciseById(id);
  }

  /**
   * Submit attempt với audio file upload
   */
  @Post('attempts')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('audio'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Submit pronunciation attempt with audio file' })
  @ApiResponse({ status: 201, description: 'Attempt submitted successfully' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        exerciseId: {
          type: 'string',
          description: 'Exercise ID',
        },
        audio: {
          type: 'string',
          format: 'binary',
          description: 'Audio file (WAV, MP3, etc.)',
        },
        audioDuration: {
          type: 'number',
          description: 'Audio duration in seconds',
        },
        timeSpent: {
          type: 'number',
          description: 'Time spent on exercise in seconds',
        },
      },
      required: ['exerciseId', 'audio'],
    },
  })
  async submitAttempt(
    @Req() req: any,
    @Body() submitDto: SubmitPronunciationAttemptDto,
    @UploadedFile() audioFile?: any,
  ) {
    const userId = req.user.userId;
    return this.pronunciationsService.submitAttempt(
      userId,
      submitDto,
      audioFile,
    );
  }

  /**
   * Submit attempt với audio URL (nếu đã upload trước)
   */
  @Post('attempts/url')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Submit pronunciation attempt with audio URL',
  })
  @ApiResponse({ status: 201, description: 'Attempt submitted successfully' })
  async submitAttemptWithUrl(
    @Req() req: any,
    @Body() submitDto: SubmitPronunciationAttemptDto,
  ) {
    const userId = req.user.userId;
    return this.pronunciationsService.submitAttempt(userId, submitDto);
  }

  /**
   * Lấy lịch sử attempts của user cho một bài tập
   */
  @Get('exercises/:exerciseId/attempts')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user attempts for a specific exercise',
  })
  @ApiResponse({ status: 200, description: 'List of attempts' })
  async getUserAttempts(
    @Req() req: any,
    @Param('exerciseId') exerciseId: string,
  ) {
    const userId = req.user.userId;
    return this.pronunciationsService.getUserAttempts(userId, exerciseId);
  }

  /**
   * Lấy thống kê của user cho một bài tập
   */
  @Get('exercises/:exerciseId/stats')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user statistics for an exercise' })
  @ApiResponse({ status: 200, description: 'Exercise statistics' })
  async getExerciseStats(
    @Req() req: any,
    @Param('exerciseId') exerciseId: string,
  ) {
    const userId = req.user.userId;
    return this.pronunciationsService.getExerciseStats(userId, exerciseId);
  }

  /**
   * Lấy tất cả attempts của user
   */
  @Get('attempts')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all user attempts' })
  @ApiResponse({ status: 200, description: 'List of all attempts' })
  async getAllUserAttempts(
    @Req() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = req.user.userId;
    return this.pronunciationsService.getAllUserAttempts(
      userId,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
    );
  }

  /**
   * Lấy chi tiết một attempt
   */
  @Get('attempts/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get pronunciation attempt by ID' })
  @ApiResponse({ status: 200, description: 'Attempt details' })
  async findAttemptById(@Param('id') id: string) {
    return this.pronunciationsService.findAttemptById(id);
  }
}
