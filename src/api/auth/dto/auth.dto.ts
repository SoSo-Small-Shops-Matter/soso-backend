import { IsNotEmpty, IsString } from 'class-validator';
export class GoogleAuthLoginDTO {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  redirectUri: string;
}

export class RefreshTokenDTO {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
