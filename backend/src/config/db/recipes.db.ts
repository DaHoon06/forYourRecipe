import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {IS_PROD} from "../../app.module";

export const Config = ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env'
    })


export const Mongo = MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGO_URI'),
        }),
        inject: [ConfigService],
    })
