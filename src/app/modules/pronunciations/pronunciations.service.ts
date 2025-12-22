// pronunciation.service.ts
import { Injectable } from '@nestjs/common';

type AssessInput = {
  audioBuffer: Buffer;
  referenceText: string;
  language: string; // e.g. en-US
};

@Injectable()
export class PronunciationService {
  private readonly region = process.env.AZURE_SPEECH_REGION;
  private readonly key = process.env.AZURE_SPEECH_KEY;

  async assessShortAudio(input: AssessInput) {
    if (!this.region || !this.key) {
      throw new Error('Missing AZURE_SPEECH_REGION / AZURE_SPEECH_KEY in env');
    }

    const { audioBuffer, referenceText, language } = input;

    // Pronunciation Assessment header (Base64 JSON)
    const pronParams = {
      ReferenceText: referenceText,
      GradingSystem: 'HundredMark',      // FivePoint | HundredMark
      Granularity: 'Word',               // Phoneme | Word | FullText
      Dimension: 'Comprehensive',        // Basic | Comprehensive
      EnableMiscue: 'True',              // bắt lỗi thiếu/thừa từ
      EnableProsodyAssessment: 'True',   // prosody (stress/intonation/rhythm)
    };

    const pronHeader = Buffer.from(JSON.stringify(pronParams), 'utf8').toString('base64');

    const url =
      `https://${this.region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1` +
      `?language=${encodeURIComponent(language)}&format=detailed`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
        'Ocp-Apim-Subscription-Key': this.key,
        'Pronunciation-Assessment': pronHeader,
      },
      body: audioBuffer.toString('base64'),
    });

    const bodyText = await res.text();
    if (!res.ok) {
      // In ra message rõ ràng để debug 401/403/400
      throw new Error(`Azure Speech error ${res.status}: ${bodyText}`);
    }

    const json = JSON.parse(bodyText);
    const best = json?.NBest?.[0];

    return {
      status: json?.RecognitionStatus,
      recognizedText: best?.Display ?? json?.DisplayText ?? '',
      scores: best
        ? {
            pronScore: best.PronScore,
            accuracy: best.AccuracyScore,
            fluency: best.FluencyScore,
            prosody: best.ProsodyScore,
            completeness: best.CompletenessScore,
            confidence: best.Confidence,
          }
        : null,
      words: best?.Words ?? [],
      raw: json,
    };
  }
}
