import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { Success201ResponseDTO } from 'src/common/response/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';

@Controller('submit')
@UseGuards(AuthGuard('jwt'))
export class SubmitController {
  constructor(private submitService: SubmitService) {}

  @Post('/')
  async submitNewShop(@Body() newShopData: SubmitNewShopDto, @Req() req: any) {
    const { uuid } = req.user;
    await this.submitService.createNewShop(newShopData, uuid);
    return new Success201ResponseDTO();
  }

  @Post('/operating')
  async submitShopOperatingHours(@Body() operatingData: SubmitShopOperatingHoursDto, @Req() req: any) {
    const { uuid } = req.user;
    await this.submitService.validateAndUpdateOperatingHours(operatingData, uuid);
    return new Success201ResponseDTO();
  }

  @Post('/products')
  async submitProducts(@Body() products: any, @Req() req: any) {
    const { uuid } = req.user;
    await this.submitService.validateAndUpdateProducts(products, uuid);
    return new Success201ResponseDTO();
  }
}
