import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.model'



@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>,
  ) { }

  getHello(): string {
    return 'Hello ooooooooooooooooooo World!';
  }
  async insertPost(title: string, body: string) {
    const newPost = new this.postModel({
        title,
        body
    });
    const result = await newPost.save();
    console.log('result', result)
    return result.id
  }
  public async getAllPost(): Promise<any> {
		const post = await this.postModel.find();
		return post;
	};
    public async getPostById(id: String): Promise<any> {
		const post = await this.postModel.findById(id);
		return post;
	};
}
