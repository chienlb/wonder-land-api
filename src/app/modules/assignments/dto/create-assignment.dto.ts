import {
  IsString,
  IsOptional,
  IsEnum,
  IsMongoId,
  IsDateString,
  IsNumber,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { AssignmentType } from '../schema/assignment.schema';
import { Type } from 'class-transformer';

export class CreateAssignmentDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(AssignmentType)
  type?: AssignmentType;

  @IsOptional()
  @IsMongoId()
  lessonId?: string;

  @IsOptional()
  @IsMongoId()
  classId?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxScore?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];

  @IsMongoId()
  createdBy: string;

  @IsOptional()
  @IsMongoId()
  updatedBy?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
