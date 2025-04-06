import { Body, Controller, Delete, Get, Req, UseGuards } from '@nestjs/common';
import { RecentSearchService } from './recent-search.service';
import { OptionalAuthGuard } from '../../common/gurad/optional-auth-guard.guard';
import { Success204ResponseDTO, SuccessResponseDTO } from '../../common/response/response.dto';
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
  async deleteRecentSearch(@Req() req: any, @Body() deleteRecentSearchDTO: DeleteRecentSearchDTO) {
    const { uuid } = req.user;
    await this.recentSearchService.deleteRecentSearch(uuid, deleteRecentSearchDTO);
    return new Success204ResponseDTO();
  }

  @Delete('/all')
  @UseGuards(JwtAuthGuard)
  async deleteAllRecentSearch(@Req() req: any) {
    const { uuid } = req.user;
    await this.recentSearchService.deleteAllRecentSearch(uuid);
    return new Success204ResponseDTO();
  }
}
