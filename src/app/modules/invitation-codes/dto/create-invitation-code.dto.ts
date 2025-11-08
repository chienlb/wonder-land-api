import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsBoolean,
  IsMongoId,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InvitationCodeType } from '../schema/invitation-code.schema';

export class CreateInvitationCodeDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  code?: string; // Mã mời (6-10 ký tự), có thể hệ thống tự random

  @IsOptional()
  @IsString()
  event?: string; // Sự kiện / mục đích mã

  @IsOptional()
  @IsString()
  description?: string; // Mô tả mã mời

  @IsOptional()
  @IsEnum(InvitationCodeType)
  type?: InvitationCodeType; // Loại mã (trial, discount, special, group_join)

  @Type(() => Number)
  @IsInt()
  @Min(1)
  totalUses: number; // Tổng số lần sử dụng mã

  @Type(() => Number)
  @IsInt()
  @Min(0)
  usesLeft: number; // Lượt sử dụng còn lại

  @IsDateString()
  startedAt: string; // Ngày bắt đầu hiệu lực

  @IsOptional()
  @IsDateString()
  expiredAt?: string; // Ngày hết hạn (nếu có)

  @IsOptional()
  @IsBoolean()
  isSystem?: boolean; // true = mã hệ thống, false = mã người dùng

  @IsOptional()
  @IsBoolean()
  isActive?: boolean; // Mặc định: true

  @IsMongoId()
  createdBy: string; // ID người tạo

  @IsOptional()
  @IsMongoId()
  updatedBy?: string; // ID người cập nhật
}
