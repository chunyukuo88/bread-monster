'use client'

import { FormEvent, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function BreadForm() {
  const supabase = createClient();
  const [nameOfRecipe, setNameOfRecipe] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('New bread recipe:', { nameOfRecipe });
    setNameOfRecipe('');
    const { error } = await supabase
      .from(process.env.NEXT_PUBLIC_TABLE_BAKES!)
      .insert({ recipeName: nameOfRecipe })
    if (error) {
      return alert(`Errorz!: ${error}`);
    }
    return alert(`Successfully created recipe: ${nameOfRecipe}`);
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
        <button type='submit'>Create Recipe</button>
      </form>
    </div>
  </>
}