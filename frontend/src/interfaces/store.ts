export namespace STORE {
  export interface RecipeState {
    _id: string;
    name: string;
    img: string;
    selected?: boolean;
  }

  export interface UtilState {
    currentPath: number;
  }

  export interface UserState {
    accessToken: string;
    refreshToken: string;
    name: string;
  }
}
