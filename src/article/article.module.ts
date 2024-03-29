import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './schema/article.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'Article', schema:  ArticleSchema }])
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
