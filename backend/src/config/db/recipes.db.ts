import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve('.env'),
});

export const Config = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});

export const Mongo = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGO_URI') || process.env.MONGO_URI,
  }),
  inject: [ConfigService],
});
