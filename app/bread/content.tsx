'use client';

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';

async function getData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  console.log('table:');
  console.log(process.env.NEXT_PUBLIC_TABLE_BAKES!);
  const { data } = await supabase
    .from(process.env.NEXT_PUBLIC_TABLE_BAKES!)
    .select()
    .order('id', { ascending: true });
  // console.log('data:');
  // console.dir(data);
  return data ? [0] : [];
}

export default function Bakes() {
  const [breadData, setBreadData] = useState();

  useEffect(() => {
    getData().then(data => {
      setBreadData(data)
    });
  }, []);

  if (breadData) {
    console.log(breadData);
  }

  return <pre>{JSON.stringify(breadData)}</pre>
}