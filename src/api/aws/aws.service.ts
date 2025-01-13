import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as config from 'config';
const awsConfig = config.get('aws');

@Injectable()
export class AwsService {
  s3Client: S3Client;

  constructor() {
    // AWS S3 클라이언트 초기화
    this.s3Client = new S3Client({
      region: awsConfig.REGION,
      credentials: {
        accessKeyId: awsConfig.ACCESS_KEY,
        secretAccessKey: awsConfig.SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadImagesToS3(
    files: Express.Multer.File[] | Express.Multer.File | undefined, // 파일 배열, 단일 파일, 또는 undefined
    ext: string, // 파일 확장자
  ): Promise<string[]> {
    // 파일이 없으면 빈 배열 반환
    if (!files) {
      return [];
    }

    // 파일 배열로 변환 (단일 파일인 경우에도 배열로 처리)
    const fileArray = Array.isArray(files) ? files : [files];

    // 파일 업로드 처리
    const uploadPromises = fileArray.map(async (file) => {
      const fileName = `review/${Date.now()}-${file.originalname}`; // 고유 파일 이름 생성

      const command = new PutObjectCommand({
        Bucket: awsConfig.BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: `image/${ext}`,
      });

      // S3에 파일 업로드
      await this.s3Client.send(command);

      // 업로드된 이미지의 URL 반환
      return `https://${awsConfig.BUCKET_NAME}.s3.${awsConfig.REGION}.amazonaws.com/${fileName}`;
    });

    // 모든 업로드 작업 완료 후 결과 URL 배열 반환
    return Promise.all(uploadPromises);
  }
}
