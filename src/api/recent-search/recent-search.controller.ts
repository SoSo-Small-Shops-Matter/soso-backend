import { Body, Controller, Delete, Get, Req, UseGuards } from '@nestjs/common';
import { RecentSearchService } from './recent-search.service';
import { OptionalAuthGuard } from '../../common/gurad/optional-auth-guard.guard';
import { Success204ResponseDTO, SuccessResponseDTO } from '../../common/response/response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('recent-search')
export class RecentSearchController {
  constructor(private readonly recentSearchService: RecentSearchService) {}
  @Get('/')
  @UseGuards(OptionalAuthGuard)
  async getRecentSearch(@Req() req: any) {
    const uuid = req?.user?.uuid || null;
    return new SuccessResponseDTO(await this.recentSearchService.getRecentSearch(uuid));
  }

  @Delete('/')
  @UseGuards(AuthGuard('jwt'))
  async deleteRecentSearch(@Req() req: any, @Body('shopName') shopName: string) {
    const { uuid } = req.user;
    await this.recentSearchService.deleteRecentSearch(uuid, shopName);
    return new Success204ResponseDTO();
  }

  @Delete('/all')
  @UseGuards(AuthGuard('jwt'))
  async deleteAllRecentSearch(@Req() req: any) {
    const { uuid } = req.user;
    await this.recentSearchService.deleteAllRecentSearch(uuid);
    return new Success204ResponseDTO();
  }
}
