import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SaveFeedback {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  feedback: string;
}
