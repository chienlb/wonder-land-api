import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole, UserTypeAccount } from '../../users/schema/user.schema';

export class RegisterAuthDto extends OmitType(CreateUserDto, [
  'status',
  'isVerify',
  'exp',
  'streakDays',
  'progressLevel',
  'tokenVerify',
  'refCode', // refCode là mã của người mời, không cần client nhập
  'invitedBy',
  'lastLoginAt',
] as const) {
  @IsEnum(UserRole)
  role: UserRole; // STUDENT | TEACHER | PARENT

  @IsEnum(UserTypeAccount)
  typeAccount: UserTypeAccount; // NORMAL | GOOGLE | FACEBOOK | APPLE

  @IsOptional()
  @IsString()
  inviteCode?: string; // 🆕 mã mời nhập từ học sinh khi đăng ký
}
