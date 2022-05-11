import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';



@Injectable()
export class PostsService {
    getHello(): string {
      return 'Hello ooooooooooooooooooo World!';
    }
    async getPosts(){
        const myPosts = await fetch('https://jsonplaceholder.typicode.com/posts')
        const response = await myPosts.json()
        //console.log(response)
        return response
    }
  }
  