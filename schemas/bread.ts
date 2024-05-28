type Difficulty = 'beginner' | 'intermediate' | 'advanced';

type Ferment = 'biga' | 'poolish' | 'pâte fermentée' | 'levain' | 'barm' | 'soaker';

type Ingredient = {
  name: string;
  weight: number;
  caloriesPerGram?: number;
  note: string;
};

type SecondaryIngredients = {
  name: string;
  ingredients: Ingredient[];
};

type breadSchema = {
  id: number; // default Postgres column
  created_at: string; // default Postgres column

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