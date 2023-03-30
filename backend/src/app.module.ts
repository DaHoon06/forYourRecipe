import { Module } from '@nestjs/common';
import { Config, Mongo } from '@config/db/recipes.db';
import { RecipesModule } from '@modules/recipes/recipes.module';
import { IngredientsModule } from '@modules/ingredients/ingredients.module';
import { UsersModule } from '@modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AppGuardModule } from '@src/guards/app.guard.module';

export const IS_PROD = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    AppGuardModule,
    Config,
    Mongo,
    RecipesModule,
    IngredientsModule,
    UsersModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
