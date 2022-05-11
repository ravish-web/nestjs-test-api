import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    @Get()
    getHello(): string {
        return this.postService.getHello();
    }
    @Post()
    async getPosts(
        @Body('title') postTitle: string,
        @Body('body') postBody: string,
    ) {
        const generatedId = await this.postService.insertPost(postTitle, postBody);
        return `post created sucessfully`
    }
    @Get('list')
    async getAllPost(){
        const post = await this.postService.getAllPost();
        console.log('post',post)
        return post
    }
    @Get(':id')
    async getPostById(@Param('id') id: string){
        const post = await this.postService.getPostById(id);
        console.log('post',post)
        return post
    }
}
