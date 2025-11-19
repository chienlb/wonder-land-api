import { PartialType } from '@nestjs/swagger';
import { CreateCloudflareDto } from './create-cloudflare.dto';

export class UpdateCloudflareDto extends PartialType(CreateCloudflareDto) {}
