'use client';

import { createClient} from "@/utils/supabase/client";
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
  const [breadData, setBreadData] = useState<Bread>();

  useEffect(() => {
    getData().then(data => {
      console.log('data:');
      console.dir(data[0]?.countryOfOrigin);

      setBreadData(data[0])
    });
  }, []);

  if (breadData) {
    console.log(breadData);
  }

  return <>
    <div>{breadData?.countryOfOrigin}</div>
  </>
}