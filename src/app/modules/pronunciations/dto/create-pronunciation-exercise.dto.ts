import {
  IsString,
  IsOptional,
  IsEnum,
  IsMongoId,
  IsNumber,
  Min,
  Max,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  PronunciationDifficulty,
  PronunciationExerciseStatus,
} from '../schema/pronunciation-exercise.schema';

export class CreatePronunciationExerciseDto {
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  ipa?: string;

  @IsOptional()
  @IsString()
  translation?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  referenceAudio?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  referenceAudioDuration?: number;

  @IsOptional()
  @IsMongoId()
  lessonId?: string;

  @IsOptional()
  @IsMongoId()
  unitId?: string;

  @IsString()
  level: string;

  @IsEnum(PronunciationDifficulty)
  difficulty: PronunciationDifficulty;

  @IsOptional()
  @IsString()
  topic?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  minScore?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  maxAttempts?: number;

  @IsOptional()
  @IsEnum(PronunciationExerciseStatus)
  isActive?: PronunciationExerciseStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  orderIndex?: number;

  @IsMongoId()
  createdBy: string;

  @IsOptional()
  @IsMongoId()
  updatedBy?: string;
}
