import {Module} from '@nestjs/common';
import {RecipesModule} from './modules/recipes/recipes.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";

export const IS_PROD = process.env.NODE_ENV === 'production';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: IS_PROD ? '.env' : '.env.dev'
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
            }),
            inject: [ConfigService],
        }),
        RecipesModule
    ],
})
export class AppModule {
}
