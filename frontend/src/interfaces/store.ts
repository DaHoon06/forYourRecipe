export namespace STORE {
  export interface RecipeState {
    _id: string;
    name: string;
    img: string;
    selected?: boolean;
  }

  export interface UtilState {
    currentPath: number;
    isLogin: boolean;
  }

  export interface UserState {
    accessToken: string;
    refreshToken: string;
    name: string;
    img: string;
    uid: string;
    favoriteRecipes: string[];
  }
}
