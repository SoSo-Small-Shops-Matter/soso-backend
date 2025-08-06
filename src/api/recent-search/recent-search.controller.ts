import { Body, Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { RecentSearchService } from './recent-search.service';
import { OptionalAuthGuard } from '../../common/gurad/optional-auth-guard.guard';
import { SuccessNoResultResponseDTO, SuccessResponseDTO } from '../../common/response/response.dto';
import { DeleteRecentSearchDTO } from './dto/recent-search.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { RecentSearchDTO } from './dto/recent-search-response.dto';

@ApiTags('Recent-Search')
@ApiBearerAuth('JWT-auth')
@Controller('recent-search')
export class RecentSearchController {
  constructor(private readonly recentSearchService: RecentSearchService) {}

  @Get('/')
  @UseGuards(OptionalAuthGuard)
  @ApiOperation({
    summary: '최근 검색 기록 조회',
    description: '로그인된 경우 최근 검색한 소품샵 리스트를 반환합니다.',
  })
  @ApiExtraModels(SuccessResponseDTO, RecentSearchDTO)
  @ApiOkResponse({
    description: '최근 검색 기록 조회 성공',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDTO) },
        {
          properties: {
            result: {
              type: 'array',
              items: { $ref: getSchemaPath(RecentSearchDTO) },
            },
          },
        },
      ],
    },
  })
  async getRecentSearch(@GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.recentSearchService.getRecentSearch(uuid));
  }

  @Delete('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '최근 검색 기록 삭제',
    description: '최근 검색 기록 소품샵 이름으로 삭제',
  })
  @ApiOkResponse({
    description: '최근 검색 기록 삭제 완료',
    type: SuccessNoResultResponseDTO,
  })
  async deleteRecentSearch(@GetUUID() uuid: string, @Body() deleteRecentSearchDTO: DeleteRecentSearchDTO) {
    await this.recentSearchService.deleteRecentSearch(uuid, deleteRecentSearchDTO);
    return new SuccessNoResultResponseDTO();
  }

  @Delete('/all')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '최근 검색 기록 전체 삭제',
    description: '최근 검색 기록 전체 삭제',
  })
  @ApiOkResponse({
    description: '최근 검색 기록 전체 삭제 성공',
    type: SuccessNoResultResponseDTO,
  })
  async deleteAllRecentSearch(@GetUUID() uuid: string) {
    await this.recentSearchService.deleteAllRecentSearch(uuid);
    return new SuccessNoResultResponseDTO();
  }
}
