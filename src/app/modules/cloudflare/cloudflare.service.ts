import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { CreateCloudflareDto } from './dto/create-cloudflare.dto';

@Injectable()
export class CloudflareService {
  private readonly r2: S3Client;
  private readonly bucket: string;
  private readonly publicUrl: string;

  constructor() {
    this.r2 = new S3Client({
      region: 'auto', // Cloudflare R2 always uses "auto"
      endpoint: process.env.CF_R2_ENDPOINT, // <-- BEGIN R2
      credentials: {
        accessKeyId: process.env.CF_R2_ACCESS_ID ?? '',
        secretAccessKey: process.env.CF_R2_SECRET_KEY ?? '',
      },
    });

    this.bucket = process.env.CF_R2_BUCKET ?? '';
    this.publicUrl = process.env.CF_PUBLIC_URL ?? '';
  }

  /**
   * Create signed upload URL (FE uploads directly)
   */
  async create(dto: CreateCloudflareDto) {
    const { filename, contentType } = dto;

    // Generate unique key for file
    const key = `assignments/${Date.now()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    // Signed URL (1 hour)
    const uploadUrl = await getSignedUrl(this.r2, command, {
      expiresIn: 3600,
    });

    return {
      uploadUrl,
      fileUrl: `${this.publicUrl}/${key}`,
      key,
    };
  }

  /**
   * Generate signed DOWNLOAD URL
   */
  async getSignedUrl(filename: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: filename,
    });

    return getSignedUrl(this.r2, command, { expiresIn: 3600 });
  }
}
