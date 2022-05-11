import { Controller, Get } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService){}

    @Get('/list')
    getComments(): any{
        return this.commentService.getComments()
    }
}
