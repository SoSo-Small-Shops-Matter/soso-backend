import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiExtraModels } from '@nestjs/swagger';
import { SubmitService } from './submit.service';
import { DeleteSubmitRecordParamDto, SubmitNewProductsDto, SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { SuccessNoResultResponseDTO } from '../../common/response/response.dto';

@ApiTags('Submit')
@ApiBearerAuth('JWT-auth')
@Controller('submit')
@UseGuards(JwtAuthGuard)
export class SubmitController {
  constructor(private submitService: SubmitService) {}

  @Post('/')
  @ApiOperation({
    summary: '새로운 소품샵 제보',
  })
  @ApiOkResponse({
    description: '새로운 소품샵 제보 성공',
    type: SuccessNoResultResponseDTO,
  })
  async submitNewShop(@Body() newShopData: SubmitNewShopDto, @GetUUID() uuid: string) {
    await this.submitService.createNewShop(newShopData, uuid);
    return new SuccessNoResultResponseDTO();
  }

  @Post('/operating')
  @ApiOperation({
    summary: '소품샵 운영정보 제보',
  })
  @ApiOkResponse({
    description: '운영정보 제보 성공',
    type: SuccessNoResultResponseDTO,
  })
  async submitShopOperatingHours(@Body() operatingData: SubmitShopOperatingHoursDto, @GetUUID() uuid: string) {
    await this.submitService.validateAndUpdateOperatingHours(operatingData, uuid);
    return new SuccessNoResultResponseDTO();
  }

  @Post('/products')
  @ApiOperation({
    summary: '소품샵 판매 목록 제보',
  })
  @ApiOkResponse({
    description: '판매 목록 성공',
    type: SuccessNoResultResponseDTO,
  })
  async submitProducts(@Body() products: SubmitNewProductsDto, @GetUUID() uuid: string) {
    await this.submitService.validateAndUpdateProducts(products, uuid);
    return new SuccessNoResultResponseDTO();
  }

  @Delete('/:submitId')
  @ApiOperation({
    summary: '제보한 데이터 제거',
  })
  @ApiOkResponse({
    description: '제보한 데이터 제거 성공',
    type: SuccessNoResultResponseDTO,
  })
  async deleteSubmitRecord(@Param() deleteSubmitRecordParamDto: DeleteSubmitRecordParamDto, @GetUUID() uuid: string) {
    await this.submitService.deleteSubmitRecord(deleteSubmitRecordParamDto, uuid);
    return new SuccessNoResultResponseDTO();
  }
}
