import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Delete,
  Query,
  ConflictException,
} from '@nestjs/common';
import { NickNameDTO, PageNationDTO, ReviewPageNationDTO, UpdateProfileDTO, WishlistPageNationDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { Success204ResponseDTO, SuccessResponseDTO } from 'src/common/response/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Delete('/:uuid')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Query('deleteType') deleteType: number, @Param('uuid') uuid: string, @Req() req: any) {
    if (uuid !== req.user.uuid) throw new ConflictException('Not equal User UUID');
    return new Success204ResponseDTO(await this.userService.deleteUser(uuid, deleteType));
  }

  @Get('/nickname/:nickName')
  async checkNickName(@Param() nickNameDTO: NickNameDTO) {
    return new SuccessResponseDTO(await this.userService.findUserNickName(nickNameDTO));
  }

  @Post('/nickname')
  @UseGuards(AuthGuard('jwt'))
  async setNickName(@Body() nickNameDTO: NickNameDTO, @Req() req) {
    const { uuid } = req.user;
    return new SuccessResponseDTO(await this.userService.findAndUpdateUserNickname(nickNameDTO, uuid));
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
  async updateProfile(@Req() req, @Body() updateProfileDTO?: UpdateProfileDTO, @UploadedFile() file?: Express.Multer.File) {
    const { uuid } = req.user;
    return new SuccessResponseDTO(await this.userService.updateUserProfile(updateProfileDTO, uuid, file));
  }

  @Get('/submit')
  @UseGuards(AuthGuard('jwt'))
  async getSubmitShop(@Req() req, @Query() pageNation: PageNationDTO) {
    const { uuid } = req.user;
    return new SuccessResponseDTO(await this.userService.findSubmitRecord(pageNation, uuid));
  }

  @Get('/review')
  @UseGuards(AuthGuard('jwt'))
  async getUserReview(@Req() req: any, @Query() pageNation: ReviewPageNationDTO) {
    const { uuid } = req.user;
    return new SuccessResponseDTO(await this.userService.findUserReviews(pageNation, uuid));
  }

  @Get('/wishlist')
  @UseGuards(AuthGuard('jwt'))
  async getUserWishlist(@Req() req: any, @Query() pageNation: WishlistPageNationDTO) {
    const { uuid } = req.user;
    return new SuccessResponseDTO(await this.userService.getWishlist(pageNation, uuid));
  }
}
