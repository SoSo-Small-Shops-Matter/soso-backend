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
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import {
  ValidateNickNameDTO,
  DeleteSubmitRecordParamDto,
  DeleteTypeDTO,
  PageNationDTO,
  ReviewPageNationDTO,
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
import { OptionalAuthGuard } from '../../common/gurad/optional-auth-guard.guard';
import { RecentSearchDTO } from '../recent-search/dto/recent-search-response.dto';
import { DeleteRecentSearchDTO } from '../recent-search/dto/recent-search.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
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
  async getUserProfile(@GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.userService.getUserProfile(uuid));
  }

  @Patch('/me')
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

  @Delete('/me')
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
  async deleteUser(@Query() deleteTypeDTO: DeleteTypeDTO, @GetUUID() uuid: string) {
    await this.userService.deleteUser(uuid, deleteTypeDTO);
    return new SuccessNoResultResponseDTO();
  }

  @Get('/duplicate-check')
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
  async validateNickName(@Query() validateNickNameDTP: ValidateNickNameDTO) {
    return new SuccessResponseDTO(await this.userService.findUserNickName(validateNickNameDTP));
  }

  @Get('/me/shop-submissions')
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
  async getUserShopSubmissions(@GetUUID() uuid: string, @Query() pageNation: PageNationDTO) {
    return new SuccessResponseDTO(await this.userService.findUserShopSubmissions(pageNation, uuid));
  }

  @Delete('/me/shop-submissions/:submitId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '제보한 데이터 제거',
  })
  @ApiOkResponse({
    description: '제보한 데이터 제거 성공',
    type: SuccessNoResultResponseDTO,
  })
  async deleteUserShopSubmission(@Param() deleteSubmitRecordParamDto: DeleteSubmitRecordParamDto, @GetUUID() uuid: string) {
    await this.userService.deleteUserShopSubmission(deleteSubmitRecordParamDto, uuid);
    return new SuccessNoResultResponseDTO();
  }

  @Get('/me/reviews')
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
  async getUserReviews(@GetUUID() uuid: string, @Query() pageNation: ReviewPageNationDTO) {
    return new SuccessResponseDTO(await this.userService.findUserReviews(pageNation, uuid));
  }

  @Get('/me/wishlist')
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
  async getUserWishlists(@GetUUID() uuid: string, @Query() pageNation: WishlistPageNationDTO) {
    return new SuccessResponseDTO(await this.userService.getUserWishlists(pageNation, uuid));
  }

  @Post('/me/wishlist')
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
  async addUserWishlist(@GetUUID() uuid: string, @Body() saveWishListDto: SaveWishListDTO) {
    await this.userService.addUserWishlist(saveWishListDto, uuid);
    return new SuccessNoResultResponseDTO();
  }

  @Get('/me/recent-searches')
  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '최근 검색 기록 조회',
    description: '로그인된 경우 최근 검색한 소품샵 리스트를 반환합니다.',
  })
  @ApiExtraModels(SuccessResponseDTO, RecentSearchDTO)
  @ApiOkResponse({
    description: '최근 검색 기록 조회 성공',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDTO) },
        {
          properties: {
            result: {
              type: 'array',
              items: { $ref: getSchemaPath(RecentSearchDTO) },
            },
          },
        },
      ],
    },
  })
  async getUserRecentSearches(@GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.userService.getUserRecentSearches(uuid));
  }

  @Delete('/me/recent-searches')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '최근 검색 기록 전체 삭제',
    description: '최근 검색 기록 전체 삭제',
  })
  @ApiOkResponse({
    description: '최근 검색 기록 전체 삭제 완료',
    type: SuccessNoResultResponseDTO,
  })
  async deleteAllRecentSearch(@GetUUID() uuid: string) {
    await this.userService.deleteAllRecentSearch(uuid);
    return new SuccessNoResultResponseDTO();
  }

  @Delete('/me/recent-searches/:recentSearchId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '최근 검색 기록 삭제',
    description: '최근 검색 기록 id로 삭제',
  })
  @ApiOkResponse({
    description: '최근 검색 기록 삭제 성공',
    type: SuccessNoResultResponseDTO,
  })
  async deleteRecentSearchById(@GetUUID() uuid: string, @Param() deleteRecentSearchDTO: DeleteRecentSearchDTO) {
    await this.userService.deleteRecentSearchById(uuid, deleteRecentSearchDTO);
    return new SuccessNoResultResponseDTO();
  }
}
