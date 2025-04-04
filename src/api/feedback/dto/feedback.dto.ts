import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SaveFeedbackDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  feedback: string;
}
