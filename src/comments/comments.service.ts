import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';


@Injectable()
export class CommentsService {
    async getComments() {
        const myComments = await fetch('https://jsonplaceholder.typicode.com/comments')
        const response = await myComments.json()
        console.log(response)
        return response
    }
}
