import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { IsInt, Min, Max, IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class PaginationQueryDTO {
  @ApiProperty({ example: 1, required: true })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({ example: 10, required: true })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;
}

export class ReviewPaginationDTO extends PaginationQueryDTO {
  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'DESC', required: true })
  @IsNotEmpty()
  @Transform(({ value }) => value?.toUpperCase?.() ?? value)
  @IsIn(['ASC', 'DESC'])
  sort: string;
}

export class WishlistPageNationDTO extends PaginationQueryDTO {
  @ApiPropertyOptional({ description: '지역 필터링 지역 id', example: 1 })
  @IsOptional()
  @Type(() => Number)
  areaId?: number;
}
