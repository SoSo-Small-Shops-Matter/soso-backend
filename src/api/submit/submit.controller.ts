import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { SuccessResponseDTO } from '../../common/response/response.dto';

@Controller('submit')
@UseGuards(JwtAuthGuard)
export class SubmitController {
  constructor(private submitService: SubmitService) {}

  @Post('/')
  async submitNewShop(@Body() newShopData: SubmitNewShopDto, @GetUUID() uuid: string) {
    const result = await this.submitService.createNewShop(newShopData, uuid);
    return new SuccessResponseDTO(result);
  }

  @Post('/operating')
  async submitShopOperatingHours(@Body() operatingData: SubmitShopOperatingHoursDto, @GetUUID() uuid: string) {
    const result = await this.submitService.validateAndUpdateOperatingHours(operatingData, uuid);
    return new SuccessResponseDTO(result);
  }

  @Post('/products')
  async submitProducts(@Body() products: any, @GetUUID() uuid: string) {
    const result = await this.submitService.validateAndUpdateProducts(products, uuid);
    return new SuccessResponseDTO(result);
  }
}
