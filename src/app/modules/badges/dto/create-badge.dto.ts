import { IsString, IsOptional, IsEnum, IsNumber, IsArray, IsBoolean, IsUrl } from 'class-validator';
import { Types } from 'mongoose';
import { BadgeType } from '../schema/badge.schema';

export class CreateBadgeDto {
    @IsString()
    name: string; // Tên huy hiệu

    @IsString()
    description: string; // Mô tả

    @IsUrl()
    iconUrl: string; // Icon huy hiệu

    @IsEnum(BadgeType)
    type: BadgeType; // Loại huy hiệu

    @IsOptional()
    @IsNumber()
    level?: number; // Cấp độ 1–3

    @IsString()
    criteria: string; // Tiêu chí nhận huy hiệu

    @IsOptional()
    @IsString()
    triggerEvent?: string; // Event kích hoạt

    @IsOptional()
    @IsNumber()
    requiredValue?: number; // Mốc yêu cầu

    @IsOptional()
    @IsArray()
    givenTo?: Types.ObjectId[]; // Danh sách user đã nhận

    @IsBoolean()
    isActive: boolean; // Còn hiệu lực?

    @IsOptional()
    createdBy?: Types.ObjectId;

    @IsOptional()
    updatedBy?: Types.ObjectId;
}
