import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PronunciationExercise,
  PronunciationExerciseDocument,
} from './schema/pronunciation-exercise.schema';
import {
  PronunciationAttempt,
  PronunciationAttemptDocument,
  PronunciationAttemptStatus,
} from './schema/pronunciation-attempt.schema';
import { CreatePronunciationExerciseDto } from './dto/create-pronunciation-exercise.dto';
import { UpdatePronunciationExerciseDto } from './dto/update-pronunciation-exercise.dto';
import { SubmitPronunciationAttemptDto } from './dto/submit-pronunciation-attempt.dto';
import { CloudflareService } from '../cloudflare/cloudflare.service';

@Injectable()
export class PronunciationsService {
  private readonly logger = new Logger(PronunciationsService.name);

  constructor(
    @InjectModel(PronunciationExercise.name)
    private readonly exerciseModel: Model<PronunciationExerciseDocument>,
    @InjectModel(PronunciationAttempt.name)
    private readonly attemptModel: Model<PronunciationAttemptDocument>,
    private readonly cloudflareService: CloudflareService,
  ) { }

  /**
   * Tạo bài tập phát âm mới
   */
  async createExercise(
    createDto: CreatePronunciationExerciseDto,
  ): Promise<PronunciationExercise> {
    const exercise = new this.exerciseModel({
      ...createDto,
      createdBy: createDto.createdBy,
      updatedBy: createDto.updatedBy || createDto.createdBy,
    });

    return exercise.save();
  }

  /**
   * Cập nhật bài tập
   */
  async updateExercise(
    id: string,
    updateDto: UpdatePronunciationExerciseDto,
  ): Promise<PronunciationExercise> {
    const exercise = await this.exerciseModel.findById(id);
    if (!exercise) {
      throw new NotFoundException('Pronunciation exercise not found');
    }

    Object.assign(exercise, updateDto);
    return exercise.save();
  }

  /**
   * Xóa bài tập (soft delete)
   */
  async deleteExercise(id: string): Promise<void> {
    const exercise = await this.exerciseModel.findById(id);
    if (!exercise) {
      throw new NotFoundException('Pronunciation exercise not found');
    }

    exercise.isActive = 'deleted' as any;
    await exercise.save();
  }

  /**
   * Lấy danh sách bài tập
   */
  async findAllExercises(
    filters?: {
      lessonId?: string;
      unitId?: string;
      level?: string;
      difficulty?: string;
      topic?: string;
      tags?: string[];
    },
    page: number = 1,
    limit: number = 10,
  ) {
    const query: any = { isActive: 'active' };

    if (filters?.lessonId) {
      query.lessonId = filters.lessonId;
    }
    if (filters?.unitId) {
      query.unitId = filters.unitId;
    }
    if (filters?.level) {
      query.level = filters.level;
    }
    if (filters?.difficulty) {
      query.difficulty = filters.difficulty;
    }
    if (filters?.topic) {
      query.topic = filters.topic;
    }
    if (filters?.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }

    const exercises = await this.exerciseModel
      .find(query)
      .sort({ orderIndex: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('lessonId', 'title slug')
      .populate('unitId', 'name slug')
      .populate('createdBy', 'fullname username')
      .exec();

    const total = await this.exerciseModel.countDocuments(query);

    return {
      exercises,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Lấy chi tiết bài tập
   */
  async findExerciseById(id: string): Promise<PronunciationExercise> {
    const exercise = await this.exerciseModel
      .findById(id)
      .populate('lessonId', 'title slug')
      .populate('unitId', 'name slug')
      .populate('createdBy', 'fullname username')
      .exec();

    if (!exercise) {
      throw new NotFoundException('Pronunciation exercise not found');
    }

    return exercise;
  }

  /**
   * Upload audio file và submit attempt
   */
  async submitAttempt(
    userId: string,
    submitDto: SubmitPronunciationAttemptDto,
    audioFile?: any,
  ): Promise<PronunciationAttempt> {
    // Kiểm tra bài tập tồn tại
    const exercise = await this.exerciseModel.findById(submitDto.exerciseId);
    if (!exercise) {
      throw new NotFoundException('Pronunciation exercise not found');
    }

    // Upload audio file nếu có
    let audioUrl = submitDto.userAudio;
    if (audioFile) {
      const uploadResult = await this.cloudflareService.uploadFile(
        audioFile,
        'pronunciations',
      );
      audioUrl = uploadResult.fileUrl;
    }

    if (!audioUrl) {
      throw new BadRequestException('Audio file is required');
    }

    // Kiểm tra số lần thử
    const existingAttempts = await this.attemptModel.countDocuments({
      userId,
      exerciseId: submitDto.exerciseId,
    });

    if (exercise.maxAttempts && existingAttempts >= exercise.maxAttempts) {
      throw new BadRequestException(
        `Maximum attempts (${exercise.maxAttempts}) reached for this exercise`,
      );
    }

    // Tạo attempt mới
    const attempt = new this.attemptModel({
      userId,
      exerciseId: submitDto.exerciseId,
      userAudio: audioUrl,
      audioDuration: submitDto.audioDuration,
      attemptNumber: existingAttempts + 1,
      timeSpent: submitDto.timeSpent,
      status: PronunciationAttemptStatus.PENDING,
    });

    // Chấm điểm (có thể tích hợp API bên ngoài sau)
    const scoringResult = await this.scorePronunciation(
      exercise.text,
      exercise.referenceAudio,
      audioUrl,
    );

    // Cập nhật kết quả
    attempt.score = scoringResult.score;
    attempt.accuracy = scoringResult.accuracy;
    attempt.fluency = scoringResult.fluency;
    attempt.completeness = scoringResult.completeness;
    attempt.overallScore = scoringResult.overallScore;
    attempt.feedback = scoringResult.feedback;
    attempt.wordLevelFeedback = scoringResult.wordLevelFeedback;
    attempt.phonemeFeedback = scoringResult.phonemeFeedback;
    attempt.isPassed =
      scoringResult.overallScore >= (exercise.minScore || 60);
    attempt.status = PronunciationAttemptStatus.SCORED;

    return attempt.save();
  }

  /**
   * Chấm điểm phát âm
   * TODO: Tích hợp với API bên ngoài như Google Cloud Speech-to-Text,
   * Azure Speech Services, hoặc các service chuyên về pronunciation scoring
   */
  private async scorePronunciation(
    expectedText: string,
    referenceAudio?: string,
    userAudio?: string,
  ): Promise<{
    score: number;
    accuracy: number;
    fluency: number;
    completeness: number;
    overallScore: number;
    feedback: string;
    wordLevelFeedback: Array<{
      word: string;
      score: number;
      issues?: string[];
    }>;
    phonemeFeedback: Array<{
      phoneme: string;
      expected: string;
      actual?: string;
      score: number;
    }>;
  }> {
    // Mock scoring logic - Thay thế bằng API thực tế sau
    // Có thể tích hợp:
    // 1. Google Cloud Speech-to-Text + pronunciation assessment
    // 2. Azure Speech Services với pronunciation assessment
    // 3. IBM Watson Speech to Text với pronunciation scoring
    // 4. Custom ML model

    this.logger.debug(
      `Scoring pronunciation for text: ${expectedText}, reference: ${referenceAudio}, user: ${userAudio}`,
    );

    // Mock scores (trong thực tế sẽ gọi API)
    const accuracy = Math.floor(Math.random() * 30) + 70; // 70-100
    const fluency = Math.floor(Math.random() * 20) + 75; // 75-95
    const completeness = Math.floor(Math.random() * 15) + 80; // 80-95
    const overallScore = Math.round(
      (accuracy * 0.4 + fluency * 0.3 + completeness * 0.3),
    );

    const words = expectedText.toLowerCase().split(/\s+/);
    const wordLevelFeedback = words.map((word) => ({
      word,
      score: Math.floor(Math.random() * 20) + 75,
      issues: Math.random() > 0.7 ? ['minor_pronunciation'] : [],
    }));

    return {
      score: overallScore,
      accuracy,
      fluency,
      completeness,
      overallScore,
      feedback:
        overallScore >= 85
          ? 'Excellent pronunciation! Keep up the good work.'
          : overallScore >= 70
            ? 'Good pronunciation with minor improvements needed.'
            : 'Practice more to improve your pronunciation.',
      wordLevelFeedback,
      phonemeFeedback: [],
    };
  }

  /**
   * Lấy lịch sử attempts của user cho một bài tập
   */
  async getUserAttempts(
    userId: string,
    exerciseId: string,
  ): Promise<PronunciationAttempt[]> {
    return this.attemptModel
      .find({
        userId,
        exerciseId,
      })
      .sort({ attemptNumber: -1 })
      .populate('exerciseId', 'text level difficulty')
      .exec();
  }

  /**
   * Lấy tất cả attempts của user
   */
  async getAllUserAttempts(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const attempts = await this.attemptModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('exerciseId', 'text level difficulty topic')
      .exec();

    const total = await this.attemptModel.countDocuments({ userId });

    return {
      attempts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Lấy attempt cụ thể
   */
  async findAttemptById(id: string): Promise<PronunciationAttempt> {
    const attempt = await this.attemptModel
      .findById(id)
      .populate('exerciseId')
      .populate('userId', 'fullname username')
      .exec();

    if (!attempt) {
      throw new NotFoundException('Pronunciation attempt not found');
    }

    return attempt;
  }

  /**
   * Lấy thống kê của user cho một bài tập
   */
  async getExerciseStats(userId: string, exerciseId: string) {
    const attempts = await this.attemptModel.find({
      userId,
      exerciseId,
    });

    if (attempts.length === 0) {
      return {
        totalAttempts: 0,
        bestScore: 0,
        averageScore: 0,
        isPassed: false,
        lastAttemptAt: null,
      };
    }

    const scores = attempts
      .map((a) => a.overallScore || a.score || 0)
      .filter((s) => s > 0);
    const bestScore = Math.max(...scores);
    const averageScore =
      scores.reduce((sum, s) => sum + s, 0) / scores.length;
    const isPassed = attempts.some((a) => a.isPassed);
    const lastAttempt = attempts.sort((a, b) => (b as any).createdAt?.getTime() - (a as any).createdAt?.getTime())[0];
    return {
      totalAttempts: attempts.length,
      bestScore,
      averageScore: Math.round(averageScore * 100) / 100,
      isPassed,
      lastAttemptAt: lastAttempt ? (lastAttempt as any).createdAt : null,
    };
  }
}
