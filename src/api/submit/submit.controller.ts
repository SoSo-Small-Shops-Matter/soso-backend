import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('submit')
@UseGuards(JwtAuthGuard)
export class SubmitController {
  constructor(private submitService: SubmitService) {}

  @Post('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async submitNewShop(@Body() newShopData: SubmitNewShopDto, @Req() req: any) {
    const { uuid } = req.user;
    await this.submitService.createNewShop(newShopData, uuid);
  }

  @Post('/operating')
  @HttpCode(HttpStatus.NO_CONTENT)
  async submitShopOperatingHours(@Body() operatingData: SubmitShopOperatingHoursDto, @Req() req: any) {
    const { uuid } = req.user;
    await this.submitService.validateAndUpdateOperatingHours(operatingData, uuid);
  }

  @Post('/products')
  @HttpCode(HttpStatus.NO_CONTENT)
  async submitProducts(@Body() products: any, @Req() req: any) {
    const { uuid } = req.user;
    await this.submitService.validateAndUpdateProducts(products, uuid);
  }
}
