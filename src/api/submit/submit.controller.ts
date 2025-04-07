import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';

@Controller('submit')
@UseGuards(JwtAuthGuard)
export class SubmitController {
  constructor(private submitService: SubmitService) {}

  @Post('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async submitNewShop(@Body() newShopData: SubmitNewShopDto, @GetUUID() uuid: string) {
    await this.submitService.createNewShop(newShopData, uuid);
  }

  @Post('/operating')
  @HttpCode(HttpStatus.NO_CONTENT)
  async submitShopOperatingHours(@Body() operatingData: SubmitShopOperatingHoursDto, @GetUUID() uuid: string) {
    await this.submitService.validateAndUpdateOperatingHours(operatingData, uuid);
  }

  @Post('/products')
  @HttpCode(HttpStatus.NO_CONTENT)
  async submitProducts(@Body() products: any, @GetUUID() uuid: string) {
    await this.submitService.validateAndUpdateProducts(products, uuid);
  }
}
