import {
  IsArray,
    IsEmpty,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
import { User } from 'src/auth/schema/user.schema';
import { CreateCommentDto } from './create-comment.dto';

export class CreateArticleDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @IsString()
    readonly image: string;

    @IsString()
    readonly author: string;
    
    @IsOptional()
    @IsArray()
    readonly comments: CreateCommentDto[]

    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User
}
