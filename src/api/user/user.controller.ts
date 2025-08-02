import {
  Body,
  Controller,
  Get,
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
import { PageNationDTO, ReviewPageNationDTO, UpdateProfileDTO, WishlistPageNationDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { SaveWishListDTO } from './dto/wishlist.dto';
import { OptionalAuthGuard } from 'src/common/gurad/optional-auth-guard.guard';
import { DeleteRecentSearchDTO } from './dto/recent-search.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Delete('/me')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Query('deleteType') deleteType: number, @GetUUID() currentUUID: string) {
    return new SuccessResponseDTO(await this.userService.deleteUser(currentUUID, deleteType));
  }

  @Get('/duplicate-check')
  async checkNickName(@Query('nickName') nickName: string) {
    return new SuccessResponseDTO(await this.userService.findUserNickName(nickName));
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.userService.getUserProfile(uuid));
  }

  @Patch('/me')
  @UseGuards(JwtAuthGuard)
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

  @Get('/me/shop-submissions')
  @UseGuards(JwtAuthGuard)
  async getSubmitShop(@GetUUID() uuid: string, @Query() pageNation: PageNationDTO) {
    return new SuccessResponseDTO(await this.userService.findSubmitRecord(pageNation, uuid));
  }

  @Get('/me/reviews')
  @UseGuards(JwtAuthGuard)
  async getUserReview(@GetUUID() uuid: string, @Query() pageNation: ReviewPageNationDTO) {
    return new SuccessResponseDTO(await this.userService.findUserReviews(pageNation, uuid));
  }

  @Get('/me/wishlist')
  @UseGuards(JwtAuthGuard)
  async getUserWishlist(@GetUUID() uuid: string, @Query() pageNation: WishlistPageNationDTO) {
    return new SuccessResponseDTO(await this.userService.getUserWishlist(pageNation, uuid));
  }

  @Post('/me/wishlist')
  @UseGuards(JwtAuthGuard)
  async addUserWishlist(@GetUUID() uuid: string, @Body() saveWishListDto: SaveWishListDTO) {
    return new SuccessResponseDTO(await this.userService.addUserWishlist(saveWishListDto, uuid));
  }

  @Get('/me/recent-searches')
  @UseGuards(OptionalAuthGuard)
  async getRecentSearch(@GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.userService.getRecentSearch(uuid));
  }

  @Delete('/me/recent-searches')
  @UseGuards(JwtAuthGuard)
  async deleteAllRecentSearch(@GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.userService.deleteAllRecentSearch(uuid));
  }

  @Delete('/me/recent-searches/:recentSearchId') // 추후에 name이 아닌 id를 이용하여 삭제하는 방식으로 변경
  @UseGuards(JwtAuthGuard)
  async deleteRecentSearch(@GetUUID() uuid: string, @Body() deleteRecentSearchDTO: DeleteRecentSearchDTO) {
    return new SuccessResponseDTO(await this.userService.deleteRecentSearch(uuid, deleteRecentSearchDTO));
  }
}
