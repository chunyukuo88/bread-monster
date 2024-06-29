'use client'

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function BreadForm() {
  const supabase = createClient();
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New bread recipe:', { title });
    setTitle('');
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Create Recipe</button>
      </form>
    </div>
  </>
}