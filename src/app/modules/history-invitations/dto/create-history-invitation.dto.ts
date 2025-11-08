import {
  IsMongoId,
  IsString,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';

export enum HistoryInvitationStatus {
  ACCEPTED = 'accepted',
  PENDING = 'pending',
  DECLINED = 'declined',
}

export class CreateHistoryInvitationDto {
  @IsMongoId()
  userId: string; // ID người dùng được mời

  @IsString()
  code: string; // Mã mời đã sử dụng

  @IsDateString()
  invitedAt: string; // Ngày được mời (ISO 8601)

  @IsEnum(HistoryInvitationStatus)
  status: HistoryInvitationStatus; // Trạng thái lời mời

  @IsOptional()
  @IsDateString()
  createdAt?: string; // Ngày tạo

  @IsOptional()
  @IsDateString()
  updatedAt?: string; // Ngày cập nhật
}
