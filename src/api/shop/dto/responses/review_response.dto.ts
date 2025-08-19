import { ApiProperty } from '@nestjs/swagger';
import { PreSignedURLResponsesDTO } from '../../../user/dto/responses/user_responses.dto';

export class PreSignedURLListResponseDTO {
  @ApiProperty({ type: [PreSignedURLResponsesDTO] })
  items: PreSignedURLResponsesDTO[];

  @ApiProperty({
    description: '모든 Presigned URL에 공통 적용된 TTL(초)',
    example: 300,
  })
  ttlSec: number;
}
