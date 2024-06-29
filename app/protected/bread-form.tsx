'use client'

import { FormEvent, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import {Difficulty, Ferment, ImageUrls, Ingredient, SecondaryIngredients} from "@/schemas/bread";

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
  const [imageUrls, setImageUrls] = useState<ImageUrls>({ pristine: '' });
  const [toolsRequired, setToolsRequired] = useState<string[]>([]);

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const updatedIngredients = [...ingredientsPrimary];
    updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
    setIngredientsPrimary(updatedIngredients);
  };

  const handleSecondaryIngredientChange = (index: number, field: keyof SecondaryIngredients, value: string) => {
    const updatedIngredients = [...ingredientsSecondary];
    updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
    setIngredientsSecondary(updatedIngredients);
  };

  const handleInstructionChange = (index: number, value: string) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };

  const handleToolChange = (index: number, value: string) => {
    const updatedTools = [...toolsRequired];
    updatedTools[index] = value;
    setToolsRequired(updatedTools);
  };

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
        <div className='bread-type-checkboxes'>
          <div>
            <label>
              <input
                type="checkbox"
                checked={flatBread}
                onChange={(e) => setFlatBread(e.target.checked)}
              />
              Flat Bread
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={sameDayRecipe}
                onChange={(e) => setSameDayRecipe(e.target.checked)}
              />
              Same Day Recipe
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={wholeWheat}
                onChange={(e) => setWholeWheat(e.target.checked)}
              />
              Whole Wheat
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={enrichedDough}
                onChange={(e) => setEnrichedDough(e.target.checked)}
              />
              Enriched Dough
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="countryOfOrigin">Country of Origin:</label>
          <input
            type="text"
            id="countryOfOrigin"
            value={countryOfOrigin}
            onChange={(e) => setCountryOfOrigin(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="hydrationPercentage">Hydration Percentage:</label>
          <input
            type="number"
            id="hydrationPercentage"
            value={hydrationPercentage}
            onChange={(e) => setHydrationPercentage(Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="bakeTempFahrenheit">Bake Temperature (°F):</label>
          <input
            type="number"
            id="bakeTempFahrenheit"
            value={bakeTempFahrenheit || ''}
            onChange={(e) => setBakeTempFahrenheit(e.target.value ? Number(e.target.value) : null)}
          />
        </div>

        <div>
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <h3>Primary Ingredients</h3>
          {ingredientsPrimary.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                placeholder="Ingredient name"
              />
              <input
                type="number"
                value={ingredient.amount}
                onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                placeholder="Amount"
              />
              <input
                type="text"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                placeholder="Unit"
              />
            </div>
          ))}
          <button type="button"
                  onClick={() => setIngredientsPrimary([...ingredientsPrimary, {name: '', amount: 0, unit: ''}])}>
            Add Primary Ingredient
          </button>
        </div>

        <div>
          <h3>Secondary Ingredients</h3>
          {ingredientsSecondary.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => handleSecondaryIngredientChange(index, 'name', e.target.value)}
                placeholder="Ingredient name"
              />
              <input
                type="number"
                value={ingredient.amount}
                onChange={(e) => handleSecondaryIngredientChange(index, 'amount', e.target.value)}
                placeholder="Amount"
              />
              <input
                type="text"
                value={ingredient.unit}
                onChange={(e) => handleSecondaryIngredientChange(index, 'unit', e.target.value)}
                placeholder="Unit"
              />
            </div>
          ))}
          <button type="button"
                  onClick={() => setIngredientsSecondary([...ingredientsSecondary, {name: '', amount: 0, unit: ''}])}>
            Add Secondary Ingredient
          </button>
        </div>

        <div>
          <h3>Instructions</h3>
          {instructions.map((instruction, index) => (
            <div key={index}>
            <textarea
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              placeholder={`Step ${index + 1}`}
            />
            </div>
          ))}
          <button type="button" onClick={() => setInstructions([...instructions, ''])}>
            Add Instruction
          </button>
        </div>

        <div>
          <h3>Preferment</h3>
          <select
            value={preferment?.type || ''}
            onChange={(e) => setPreferment(e.target.value ? {type: e.target.value as Ferment, ingredients: []} : null)}
          >
            <option value="">No preferment</option>
            <option value="poolish">Poolish</option>
            <option value="biga">Biga</option>
            <option value="sourdough">Sourdough</option>
          </select>
          {preferment && (
            <div>
              {/* Add inputs for preferment ingredients similar to primary ingredients */}
            </div>
          )}
        </div>

        <div>
          <h3>Source</h3>
          <input
            type="text"
            value={source.name}
            onChange={(e) => setSource({...source, name: e.target.value})}
            placeholder="Source name"
          />
          <input
            type="url"
            value={source.url || ''}
            onChange={(e) => setSource({...source, url: e.target.value})}
            placeholder="Source URL"
          />
          <input
            type="url"
            value={source.qrCodeUrl || ''}
            onChange={(e) => setSource({...source, qrCodeUrl: e.target.value})}
            placeholder="QR Code URL"
          />
        </div>

        <div>
          <h3>Image URLs</h3>
          <input
            type="url"
            value={imageUrls.pristine}
            onChange={(e) => setImageUrls({...imageUrls, pristine: e.target.value})}
            placeholder="Pristine image URL"
          />
          {/* Add more inputs for additional image URLs if needed */}
        </div>

        <div>
          <h3>Tools Required</h3>
          {toolsRequired.map((tool, index) => (
            <div key={index}>
              <input
                type="text"
                value={tool}
                onChange={(e) => handleToolChange(index, e.target.value)}
                placeholder={`Tool ${index + 1}`}
              />
            </div>
          ))}
          <button type="button" onClick={() => setToolsRequired([...toolsRequired, ''])}>
            Add Tool
          </button>
        </div>


        <button type='submit'>Create Recipe</button>
      </form>
    </div>
  </>
}