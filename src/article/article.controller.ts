import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './schema/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt.authguard';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async getAllArticles(
    @Query() query: { page?: number; keyword?: string },
  ): Promise<Article[]> {
    return this.articleService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createArticle(
    @Body()
    article: CreateArticleDto,
    @Req() req,
  ): Promise<Article> {
    return this.articleService.create(article, req.user);
  }

  @Get(':id')
  async getArticle(
    @Param('id')
    id: string,
  ): Promise<Article> {
    return this.articleService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateArticle(
    @Param('id')
    id: string,
    @Body()
    article: UpdateArticleDto,
    @Req() req: any
  ): Promise<Article> {

    const userId = req.user?.id;

    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.articleService.updateById(id, article);
  }

  @Post(':articleId/comment')
  @UseGuards(AuthGuard())
  async createComment(
    @Param('articleId') articleId: string,
    @Body() comment: CreateCommentDto,
  ): Promise<Article> {
    return this.articleService.addCommentToArticle(articleId, comment);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteArticle(
    @Param('id') articleId: string,
    @Req() req: any
    ): Promise<string> {
    
    const userId = req.user?.id;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    return this.articleService.deleteArticle(articleId, userId);
  }
}
