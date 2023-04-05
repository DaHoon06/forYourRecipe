import no1RecipeTheme from "./no1RecipeTheme";

export const parameters = {
  docs: { theme: no1RecipeTheme },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
