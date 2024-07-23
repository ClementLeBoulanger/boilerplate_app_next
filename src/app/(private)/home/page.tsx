'use client'

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = 'Drakkar - Home';
  }, []);
  return (
    <div></div>
  )
}
