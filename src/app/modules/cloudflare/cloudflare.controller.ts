import { Controller, Post, Body } from '@nestjs/common';
import { CloudflareService } from './cloudflare.service';
import { CreateCloudflareDto } from './dto/create-cloudflare.dto';

@Controller('cloudflare')
export class CloudflareController {
  constructor(private readonly cloudflareService: CloudflareService) {}

  @Post()
  create(@Body() createCloudflareDto: CreateCloudflareDto) {
    return this.cloudflareService.create(createCloudflareDto);
  }
}
