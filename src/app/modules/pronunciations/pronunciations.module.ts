import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PronunciationsController } from './pronunciations.controller';
import { PronunciationsService } from './pronunciations.service';
import {
  PronunciationExercise,
  PronunciationExerciseSchema,
} from './schema/pronunciation-exercise.schema';
import {
  PronunciationAttempt,
  PronunciationAttemptSchema,
} from './schema/pronunciation-attempt.schema';
import { CloudflareModule } from '../cloudflare/cloudflare.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PronunciationExercise.name, schema: PronunciationExerciseSchema },
      { name: PronunciationAttempt.name, schema: PronunciationAttemptSchema },
    ]),
    CloudflareModule,
  ],
  controllers: [PronunciationsController],
  providers: [PronunciationsService],
  exports: [PronunciationsService],
})
export class PronunciationsModule { }
