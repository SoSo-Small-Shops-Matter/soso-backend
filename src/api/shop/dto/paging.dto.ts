import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class GetShopWithin1KmDTO {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number) // 문자열 → 숫자 변환
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  lng: number;

  @IsBoolean()
  @IsNotEmpty()
  @Matches(/^[^\x00-\x1F\x7F]*$/, {
    message: '제어 문자를 포함할 수 없습니다.',
  })
  @Matches(/^(?!.*(<script|<\/script>|<iframe|on\w+=|javascript:|eval\()).*$/i, {
    message: '스크립트 또는 악성 코드를 포함할 수 없습니다.',
  })
  @Type(() => Boolean) // 'true'/'false' → boolean 변환
  sorting: boolean;
}

export class GetSearchPageShopDTO {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[^\x00-\x1F\x7F]*$/, {
    message: '제어 문자를 포함할 수 없습니다.',
  })
  @Matches(/^(?!.*(<script|<\/script>|<iframe|on\w+=|javascript:|eval\()).*$/i, {
    message: '스크립트 또는 악성 코드를 포함할 수 없습니다.',
  })
  keyword: string;
}
