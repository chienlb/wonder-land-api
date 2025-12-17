import {
  IsString,
  IsMongoId,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';

export class SubmitPronunciationAttemptDto {
  @IsMongoId()
  exerciseId: string;

  @IsString()
  userAudio: string; // URL audio file đã upload lên Cloudflare R2

  @IsOptional()
  @IsNumber()
  @Min(0)
  audioDuration?: number; // Thời lượng audio (giây)

  @IsOptional()
  @IsNumber()
  @Min(0)
  timeSpent?: number; // Thời gian làm bài (giây)
}
