import { Module } from '@nestjs/common';
import { RecipesModule } from '@modules/recipes/recipes.module';
import { IngredientsModule } from '@modules/ingredients/ingredients.module';
import { UsersModule } from '@modules/users/users.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {ReplyModule} from "@modules/reply/reply.module";
import {MongooseModule} from "@nestjs/mongoose";

const IS_PROD = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    RecipesModule,
    IngredientsModule,
    UsersModule,
    ReplyModule,
  ],
})
export class AppModule {}
