import { Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { ARTICLES } from './dummydata/articles';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "Hi";
  }
  
  @Get('/api/articles')
  getArticles():any[]{
    return ARTICLES;
  }

  @Get('/api/articles/:id')
getArticleById(@Param('id') id: string) {
  console.log(id);
  return ARTICLES.find((n) => n._id === id);
}
}
