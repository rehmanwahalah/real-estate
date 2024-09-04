import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
export class UpdateProfileDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  username: string;

  @IsOptional()
  email: string;

  avatar: any;
  ats: any;
}

export class updatePasswordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  confirmPassword: string;
}

export class addRemoveFriendDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  type: string;
}
export class validateEmailDto {
  @IsString()
  identifier: string;
}
export class NewsletterDto {
  @IsString()
  email: string;
}
export class validateEmailRegDto {
  @IsString()
  @IsEmail()
  email: string;
}
