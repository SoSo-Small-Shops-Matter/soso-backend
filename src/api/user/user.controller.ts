import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Delete,
  Query,
  ConflictException,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import {
  CheckNickNameDTO,
  DeleteTypeDTO,
  DeleteUuidDTO,
  PageNationDTO,
  ReviewPageNationDTO,
  SaveNickNameDTO,
  SaveWishListDTO,
  UpdateProfileDTO,
  UserProfileDTO,
  WishlistPageNationDTO,
} from './dto/user.dto';
import { UserService } from './user.service';
import { SuccessNoResultResponseDTO, SuccessResponseDTO } from 'src/common/response/response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import {
  ShopItemDTO,
  UserReviewsRecordDTO,
  UserReviewsRecordItemDTO,
  UserSubmitRecordDTO,
  UserSubmitRecordItemDTO,
  UserWishlistRecordDTO,
  UserWishlistRecordItemDTO,
} from './dto/paging.dto';
import { Paging } from '../shop/dto/paging.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Delete('/:uuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '회원탈퇴',
    description: '회원탈퇴',
  })
  @ApiOkResponse({
    description: '회원탈퇴 성공',
    type: SuccessNoResultResponseDTO,
  })
  async deleteUser(@Query() deleteTypeDTO: DeleteTypeDTO, @Param() deleteUuidDTO: DeleteUuidDTO, @GetUUID() currentUUID: string) {
    if (deleteUuidDTO.uuid !== currentUUID) throw new ConflictException('Not equal User UUID');
    await this.userService.deleteUser(deleteUuidDTO, deleteTypeDTO);
    return new SuccessNoResultResponseDTO();
  }

  @Get('/nickname/:nickName')
  @ApiOperation({
    summary: '닉네임 중복 체크',
    description: 'true: 중복됨 / false: 중복되지 않음',
  })
  @ApiOkResponse({
    description: '닉네임 중복 체크 결과',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDTO) },
        {
          properties: {
            result: {
              type: 'boolean',
              enum: [true, false],
            },
          },
        },
      ],
    },
  })
  async checkNickName(@Param() nickNameDTO: CheckNickNameDTO) {
    return new SuccessResponseDTO(await this.userService.findUserNickName(nickNameDTO));
  }

  @Post('/nickname')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '닉네임 설정',
  })
  @ApiOkResponse({
    description: '닉네임 설정 성공',
    type: SuccessNoResultResponseDTO,
  })
  async setNickName(@Body() nickNameDTO: SaveNickNameDTO, @GetUUID() uuid: string) {
    await this.userService.findAndUpdateUserNickname(nickNameDTO, uuid);
    return new SuccessNoResultResponseDTO();
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '프로필 정보 불러오기',
    description: 'isNew 속성은 닉네임 작성을 완료했는지 여부 false면 닉네임 설정 페이지로 이동해야 됨',
  })
  @ApiExtraModels(SuccessResponseDTO, UserProfileDTO)
  @ApiOkResponse({
    description: '프로필 정보 불러오기 성공',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDTO) },
        {
          properties: {
            result: {
              $ref: getSchemaPath(UserProfileDTO),
            },
          },
        },
      ],
    },
  })
  async getProfile(@GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.userService.getUserProfile(uuid));
  }

  @Patch('/profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '프로필 정보 수정하기',
    description: '프로필 사진: 옵셔널, 닉네임: 옵셔널',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '프로필 사진(옵션)과 닉네임(옵션)',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        nickName: {
          type: 'string',
          example: '소소한유저',
        },
      },
    },
  })
  @ApiOkResponse({
    description: '프로필 정보 수정 성공',
    type: SuccessNoResultResponseDTO,
  })
  async updateProfile(
    @GetUUID() uuid: string,
    @Body() updateProfileDTO?: UpdateProfileDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), new FileTypeValidator({ fileType: /image\/(jpg|jpeg|png)/ })],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    await this.userService.updateUserProfile(updateProfileDTO, uuid, file);
    return new SuccessNoResultResponseDTO();
  }

  @Get('/submit')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '사용자가 등록/제안한 소품샵 정보',
  })
  @ApiExtraModels(UserSubmitRecordDTO, UserSubmitRecordItemDTO, Paging)
  @ApiOkResponse({
    description: '사용자가 등록/제안한 소품샵 정보 조회 성공',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDTO) },
        {
          properties: {
            result: { $ref: getSchemaPath(UserSubmitRecordDTO) },
          },
        },
      ],
    },
  })
  async getSubmitShop(@GetUUID() uuid: string, @Query() pageNation: PageNationDTO) {
    return new SuccessResponseDTO(await this.userService.findSubmitRecord(pageNation, uuid));
  }

  @Get('/review')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '사용자가 등록한 리뷰 정보',
  })
  @ApiExtraModels(UserReviewsRecordDTO, UserReviewsRecordItemDTO, ShopItemDTO, Paging)
  @ApiOkResponse({
    description: '사용자가 등록한 리뷰 조회 성공',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDTO) },
        {
          properties: {
            result: { $ref: getSchemaPath(UserReviewsRecordDTO) },
          },
        },
      ],
    },
  })
  async getUserReview(@GetUUID() uuid: string, @Query() pageNation: ReviewPageNationDTO) {
    return new SuccessResponseDTO(await this.userService.findUserReviews(pageNation, uuid));
  }

  @Get('/wishlist')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '사용자가 짬한 소품샵 리스트',
  })
  @ApiExtraModels(UserWishlistRecordDTO, UserWishlistRecordItemDTO, ShopItemDTO, Paging)
  @ApiOkResponse({
    description: '찜한 소품샵 리스트 조회 성공',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDTO) },
        {
          properties: {
            result: { $ref: getSchemaPath(UserWishlistRecordDTO) },
          },
        },
      ],
    },
  })
  async getUserWishlist(@GetUUID() uuid: string, @Query() pageNation: WishlistPageNationDTO) {
    return new SuccessResponseDTO(await this.userService.getWishlist(pageNation, uuid));
  }

  @Post('/wishlist')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '소품샵 찜하기',
    description: '찜하기 리스트에 해당 소품샵을 넣습니다.',
  })
  @ApiOkResponse({
    description: '찜하기 성공',
    type: SuccessNoResultResponseDTO,
  })
  async addWishlist(@GetUUID() uuid: string, @Body() saveWishListDto: SaveWishListDTO) {
    await this.userService.addWishlistByShopIdAndUUID(saveWishListDto, uuid);
    return new SuccessNoResultResponseDTO();
  }
}
