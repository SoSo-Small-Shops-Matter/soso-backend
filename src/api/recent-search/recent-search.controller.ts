import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRecentSearch(@GetUUID() uuid: string, @Body() deleteRecentSearchDTO: DeleteRecentSearchDTO): Promise<void> {
    await this.recentSearchService.deleteRecentSearch(uuid, deleteRecentSearchDTO);
  }

  @Delete('/all')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllRecentSearch(@GetUUID() uuid: string): Promise<void> {
    await this.recentSearchService.deleteAllRecentSearch(uuid);
  }
}
