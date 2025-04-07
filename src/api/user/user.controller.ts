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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NickNameDTO, PageNationDTO, ReviewPageNationDTO, UpdateProfileDTO, WishlistPageNationDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Delete('/:uuid')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Query('deleteType') deleteType: number, @Param('uuid') uuid: string, @Req() req: any) {
    if (uuid !== req.user.uuid) throw new ConflictException('Not equal User UUID');
    await this.userService.deleteUser(uuid, deleteType);
  }

  @Get('/nickname/:nickName')
  async checkNickName(@Param() nickNameDTO: NickNameDTO) {
    return new SuccessResponseDTO(await this.userService.findUserNickName(nickNameDTO));
  }

  @Post('/nickname')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async setNickName(@Body() nickNameDTO: NickNameDTO, @Req() req) {
    const { uuid } = req.user;
    await this.userService.findAndUpdateUserNickname(nickNameDTO, uuid);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req) {
    const { uuid } = req.user;
    return new SuccessResponseDTO(await this.userService.getUserProfile(uuid));
  }

  @Patch('/profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(FileInterceptor('file'))
  async updateProfile(@Req() req, @Body() updateProfileDTO?: UpdateProfileDTO, @UploadedFile() file?: Express.Multer.File) {
    const { uuid } = req.user;
    await this.userService.updateUserProfile(updateProfileDTO, uuid, file);
  }

  @Get('/submit')
  @UseGuards(JwtAuthGuard)
  async getSubmitShop(@Req() req, @Query() pageNation: PageNationDTO) {
    const { uuid } = req.user;
    return new SuccessResponseDTO(await this.userService.findSubmitRecord(pageNation, uuid));
  }

  @Get('/review')
  @UseGuards(JwtAuthGuard)
  async getUserReview(@Req() req: any, @Query() pageNation: ReviewPageNationDTO) {
    const { uuid } = req.user;
    return new SuccessResponseDTO(await this.userService.findUserReviews(pageNation, uuid));
  }

  @Get('/wishlist')
  @UseGuards(JwtAuthGuard)
  async getUserWishlist(@Req() req: any, @Query() pageNation: WishlistPageNationDTO) {
    const { uuid } = req.user;
    return new SuccessResponseDTO(await this.userService.getWishlist(pageNation, uuid));
  }
}
