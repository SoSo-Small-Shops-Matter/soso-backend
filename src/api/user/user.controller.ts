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
  HttpCode,
  HttpStatus,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { NickNameDTO, PageNationDTO, ReviewPageNationDTO, UpdateProfileDTO, WishlistPageNationDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';
import { ApiDefaultResponses } from '../../common/deco/swagger-default.deco';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Delete('/:uuid')
  @ApiOperation({ summary: '회원탈퇴 API' })
  @ApiNoContentResponse()
  @ApiDefaultResponses()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Query('deleteType') deleteType: number, @Param('uuid') uuid: string, @GetUUID() currentUUID: string) {
    if (uuid !== currentUUID) throw new ConflictException('Not equal User UUID');
    await this.userService.deleteUser(uuid, deleteType);
  }

  @Get('/nickname/:nickName')
  @ApiOperation({ summary: '회원탈퇴 API' })
  @ApiDefaultResponses()
  async checkNickName(@Param() nickNameDTO: NickNameDTO) {
    return new SuccessResponseDTO(await this.userService.findUserNickName(nickNameDTO));
  }

  @Post('/nickname')
  @ApiOperation({ summary: '닉네임 저장 API' })
  @ApiNoContentResponse()
  @ApiDefaultResponses()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async setNickName(@Body() nickNameDTO: NickNameDTO, @GetUUID() uuid: string) {
    await this.userService.findAndUpdateUserNickname(nickNameDTO, uuid);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.userService.getUserProfile(uuid));
  }

  @Patch('/profile')
  @ApiOperation({ summary: '유저 프로필 업데이트 API' })
  @ApiNoContentResponse()
  @ApiDefaultResponses()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(FileInterceptor('file'))
  async updateProfile(
    @GetUUID() uuid: string,
    @Body() updateProfileDTO?: UpdateProfileDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB 제한
          new FileTypeValidator({ fileType: /image\/(jpg|jpeg|png)/ }), // ✅ jpg, jpeg, png 허용
        ],
      }),
    )
    file?: Express.Multer.File,
  ) {
    await this.userService.updateUserProfile(updateProfileDTO, uuid, file);
  }

  @Get('/submit')
  @UseGuards(JwtAuthGuard)
  async getSubmitShop(@GetUUID() uuid: string, @Query() pageNation: PageNationDTO) {
    return new SuccessResponseDTO(await this.userService.findSubmitRecord(pageNation, uuid));
  }

  @Get('/review')
  @UseGuards(JwtAuthGuard)
  async getUserReview(@GetUUID() uuid: string, @Query() pageNation: ReviewPageNationDTO) {
    return new SuccessResponseDTO(await this.userService.findUserReviews(pageNation, uuid));
  }

  @Get('/wishlist')
  @UseGuards(JwtAuthGuard)
  async getUserWishlist(@GetUUID() uuid: string, @Query() pageNation: WishlistPageNationDTO) {
    return new SuccessResponseDTO(await this.userService.getWishlist(pageNation, uuid));
  }
}
