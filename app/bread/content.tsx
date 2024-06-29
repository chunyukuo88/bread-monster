'use client';

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from 'react';

async function getData() {
  const supabase = createClient();
  const { data } = await supabase
    .from(process.env.NEXT_PUBLIC_TABLE_BAKES!)
    .select('*')
    .order('id', { ascending: true });
  return data || [];
}

export default function Bakes() {
  const [breadData, setBreadData] = useState<Bread[]>();

  useEffect(() => {
    getData().then(arrayOfBreads => {
      setBreadData(arrayOfBreads);
    });
  }, []);

  return <>
    {breadData
      ? breadData.map((bread) => (
        <div key={bread.id} className={`bread id: ${bread.id}`}>
          <div>{bread.recipeName}</div>
          <div>{bread.countryOfOrigin}</div>
        </div>
      ))
      : null}
  </>
}