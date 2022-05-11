import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    @Get()
    getHello(): string {
        return this.postService.getHello();
    }
    @Get('/list')
    getPosts(): any {
        return this.postService.getPosts();
    }
}
