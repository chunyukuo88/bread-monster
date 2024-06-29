export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type Ferment = 'biga' | 'poolish' | 'pâte fermentée' | 'levain' | 'barm' | 'soaker';

export type Ingredient = {
  name: string;
  weight: number;
  caloriesPerGram?: number;
  note: string;
};

export type SecondaryIngredients = {
  name: string;
  ingredients: Ingredient[];
};

export type ImageUrls = {
  pristine: string;
} & {
  [key: string]: string;
};

type Bread = {
  id: number; // default Postgres column
  created_at: string; // default Postgres column

  recipeName: string;

  flatBread: boolean;       // Taco shells, naan
  sameDayRecipe: boolean;   // Taco shells, Japanese milk bread, naan, peanut butter bread
  wholeWheat: boolean;
  enrichedDough: boolean;   // Brioche, babka, Japanese milk bread, soy sauce tarts, Skolebrod

  countryOfOrigin: string;
  hydrationPercentage: number;
  bakeTempFahrenheit: number | null;
  difficulty: Difficulty;
  ingredientsPrimary: Ingredient[];
  ingredientsSecondary?: SecondaryIngredients[];
  instructions: string[];
  preferment?: {
    type: Ferment;
    ingredients: Ingredient[];
  }
  source: {
    name: string;
    url?: string;
    qrCodeUrl?: string;
  }
  imageUrls: string[];
  toolsRequired: string[];
}