import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { RecentSearchService } from './recent-search.service';
import { OptionalAuthGuard } from '../../common/gurad/optional-auth-guard.guard';
import { SuccessResponseDTO } from '../../common/response/response.dto';
import { DeleteRecentSearchDTO } from './dto/recent-search.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('recent-search')
export class RecentSearchController {
  constructor(private readonly recentSearchService: RecentSearchService) {}
  @Get('/')
  @UseGuards(OptionalAuthGuard)
  async getRecentSearch(@Req() req: any) {
    const uuid = req.user?.uuid || null;
    return new SuccessResponseDTO(await this.recentSearchService.getRecentSearch(uuid));
  }

  @Delete('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRecentSearch(@Req() req: any, @Body() deleteRecentSearchDTO: DeleteRecentSearchDTO): Promise<void> {
    const { uuid } = req.user;
    await this.recentSearchService.deleteRecentSearch(uuid, deleteRecentSearchDTO);
  }

  @Delete('/all')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllRecentSearch(@Req() req: any): Promise<void> {
    const { uuid } = req.user;
    await this.recentSearchService.deleteAllRecentSearch(uuid);
  }
}
