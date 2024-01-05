import {
  IsArray,
    IsEmpty,
    IsOptional,
    IsString,
    isArray,
  } from 'class-validator';
import { User } from 'src/auth/schema/user.schema';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateArticleDto {
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly content: string;

    @IsOptional()
    @IsString()
    readonly image: string;

    @IsOptional()
    @IsString()
    readonly author: string;

    @IsOptional()
    @IsArray()
    readonly comments: CreateCommentDto[]

    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User;
}
