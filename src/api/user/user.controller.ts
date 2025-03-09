import { Body, Controller, Get, Param, Post, Patch, Req, UploadedFile, UseGuards, UseInterceptors, Delete, Query } from '@nestjs/common';
import { NickNameDto, PageNationDto, ReviewPageNationDto, UpdateProfileDto, WishlistPageNationDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Success204ResponseDTO, SuccessResponseDTO } from 'src/common/response/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Delete('/:uuid')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Query('deleteType') deleteType: number, @Param('uuid') uuid: string) {
    return new Success204ResponseDTO(await this.userService.deleteUser(uuid, deleteType));
  }

  @Get('/nickname/:nickName')
  async checkNickName(@Param() nickNameDto: NickNameDto) {
    const { nickName } = nickNameDto;
    return new SuccessResponseDTO(await this.userService.findUserNickName(nickName));
  }

  @Post('/nickname')
  @UseGuards(AuthGuard('jwt'))
  async setNickName(@Body() nickNameDto: NickNameDto, @Req() req) {
    const { nickName } = nickNameDto;
    const { uuid } = req.user;
    return new SuccessResponseDTO(await this.userService.findAndUpdateUserNickname(nickName, uuid));
  }
  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req) {
    const { uuid } = req.user;
    return new SuccessResponseDTO(await this.userService.getUserProfile(uuid));
  }

  @Patch('/profile')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async updateProfile(@Req() req, @Body() updateProfileDto?: UpdateProfileDto, @UploadedFile() file?: Express.Multer.File) {
    const { nickName } = updateProfileDto;
    const { uuid } = req.user;
    return new SuccessResponseDTO(await this.userService.updateUserProfile(nickName, uuid, file));
  }

  @Get('/submit')
  @UseGuards(AuthGuard('jwt'))
  async getSubmitShop(@Req() req, @Query() pageNation: PageNationDto) {
    const { uuid } = req.user;
    const { page, limit } = pageNation;
    return new SuccessResponseDTO(await this.userService.findSubmitRecord(uuid, page, limit));
  }

  @Get('/review')
  @UseGuards(AuthGuard('jwt'))
  async getUserReview(@Req() req: any, @Query() pageNation: ReviewPageNationDto) {
    const { uuid } = req.user;
    const { page, limit, sort } = pageNation;
    return new SuccessResponseDTO(await this.userService.findUserReviews(uuid, page, limit, sort));
  }

  @Get('/wishlist')
  @UseGuards(AuthGuard('jwt'))
  async getUserWishlist(@Req() req: any, @Query() pageNation: WishlistPageNationDto) {
    const { uuid } = req.user;
    const { page, limit, area } = pageNation;
    return new SuccessResponseDTO(await this.userService.getWishlist(uuid, page, limit, area));
  }
}
