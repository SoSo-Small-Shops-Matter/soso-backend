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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Delete('/:uuid')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Query('deleteType') deleteType: number, @Param('uuid') uuid: string, @GetUUID() currentUUID: string) {
    if (uuid !== currentUUID) throw new ConflictException('Not equal User UUID');
    return new SuccessResponseDTO(await this.userService.deleteUser(uuid, deleteType));
  }

  @Get('/nickname/:nickName')
  async checkNickName(@Param() nickNameDTO: NickNameDTO) {
    return new SuccessResponseDTO(await this.userService.findUserNickName(nickNameDTO));
  }

  @Post('/nickname')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async setNickName(@Body() nickNameDTO: NickNameDTO, @GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.userService.findAndUpdateUserNickname(nickNameDTO, uuid));
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.userService.getUserProfile(uuid));
  }

  @Patch('/profile')
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
    return new SuccessResponseDTO(await this.userService.updateUserProfile(updateProfileDTO, uuid, file));
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
