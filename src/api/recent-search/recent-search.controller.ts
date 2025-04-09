import { Body, Controller, Delete, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { RecentSearchService } from './recent-search.service';
import { OptionalAuthGuard } from '../../common/gurad/optional-auth-guard.guard';
import { SuccessResponseDTO } from '../../common/response/response.dto';
import { DeleteRecentSearchDTO } from './dto/recent-search.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';

@Controller('recent-search')
export class RecentSearchController {
  constructor(private readonly recentSearchService: RecentSearchService) {}
  @Get('/')
  @UseGuards(OptionalAuthGuard)
  async getRecentSearch(@GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.recentSearchService.getRecentSearch(uuid));
  }

  @Delete('/')
  @UseGuards(JwtAuthGuard)
  async deleteRecentSearch(@GetUUID() uuid: string, @Body() deleteRecentSearchDTO: DeleteRecentSearchDTO) {
    return new SuccessResponseDTO(await this.recentSearchService.deleteRecentSearch(uuid, deleteRecentSearchDTO));
  }

  @Delete('/all')
  @UseGuards(JwtAuthGuard)
  async deleteAllRecentSearch(@GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.recentSearchService.deleteAllRecentSearch(uuid));
  }
}
