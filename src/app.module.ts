import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
 // imports: [PostsModule, CommentsModule],
 imports: [ProductsModule,PostsModule, CommentsModule,
   MongooseModule.forRoot('mongodb+srv://ravish:te0k0YmMXHda843U@cluster0.7ohw4.mongodb.net/test?retryWrites=true&w=majority',
   ),
   UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [
		UsersModule,
		MongooseModule,
	]
})
export class AppModule {}
