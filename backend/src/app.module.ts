import {Module} from '@nestjs/common';
import {Config, Mongo} from "./config/db/recipes.db";
import {RecipesModule} from './modules/recipes/recipes.module';
import {IngredientsModule} from "./modules/ingredients/ingredients.module";
import {UsersModule} from "./modules/users/users.module";

export const IS_PROD = process.env.NODE_ENV === 'production';

@Module({
    imports: [
        Config,
        Mongo,
        RecipesModule,
        IngredientsModule,
        UsersModule,
    ],
})
export class AppModule {}
