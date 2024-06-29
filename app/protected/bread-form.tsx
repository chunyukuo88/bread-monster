'use client'

import { FormEvent, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Difficulty, Ferment, Ingredient, SecondaryIngredients } from "@/schemas/bread";

export default function BreadForm() {
  const supabase = createClient();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('New bread recipe:', { nameOfRecipe });
    setNameOfRecipe('');
    const { error } = await supabase
      .from(process.env.NEXT_PUBLIC_TABLE_BAKES!)
      .insert({ recipeName: nameOfRecipe })
    if (error) {
      return alert(`Arts degree! You failed: ${error}`);
    }
    return alert(`Successfully created recipe: ${nameOfRecipe}`);
  };

  const [nameOfRecipe, setNameOfRecipe] = useState('');
  const [flatBread, setFlatBread] = useState<boolean>(false);
  const [sameDayRecipe, setSameDayRecipe] = useState<boolean>(false);
  const [wholeWheat, setWholeWheat] = useState<boolean>(false);
  const [enrichedDough, setEnrichedDough] = useState<boolean>(false);
  const [countryOfOrigin, setCountryOfOrigin] = useState<string>('');
  const [hydrationPercentage, setHydrationPercentage] = useState<number>(0);
  const [bakeTempFahrenheit, setBakeTempFahrenheit] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [ingredientsPrimary, setIngredientsPrimary] = useState<Ingredient[]>([]);
  const [ingredientsSecondary, setIngredientsSecondary] = useState<SecondaryIngredients[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [preferment, setPreferment] = useState<{
    type: Ferment;
    ingredients: Ingredient[];
  } | null>(null);
  const [source, setSource] = useState<{
    name: string;
    url?: string;
    qrCodeUrl?: string;
  }>({ name: '' });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [toolsRequired, setToolsRequired] = useState<string[]>([]);



  return <>
    <div>
      <h2>Create New Bread Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='recipeTitle'>Recipe Title:</label>
          <input
            type='text'
            id='recipeTitle'
            value={nameOfRecipe}
            onChange={(e) => setNameOfRecipe(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Create Recipe</button>
      </form>
    </div>
  </>
}