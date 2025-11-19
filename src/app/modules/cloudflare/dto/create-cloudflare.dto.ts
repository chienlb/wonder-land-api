import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCloudflareDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  contentType: string;
}
