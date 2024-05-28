'use client';

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';

const TABLE_BAKES = 'bread-monster__bakes';

async function getData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from(TABLE_BAKES)
    .select()
    .order('id', { ascending: true });
  console.log('data');
  console.dir(data);
  return data;
}

export default function Bakes() {
  const [breadData, setBreadData] = useState(null);

  useEffect(() => {
    getData().then(data => setBreadData(data));
  }, []);

  if (breadData) {
    console.log(breadData);
  }

  return <pre>{JSON.stringify(breadData)}</pre>
}