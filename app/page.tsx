'use client';

import { useState, useEffect, use, AnyActionArg } from "react";
import CardBox from "./components/card";

const apiLink = "https://api.jikan.moe/v4/top/anime";

interface AnimeData {
  rank: number;
  title: string;
  image: string;  
}

async function fetchData():Promise<AnimeData[]> {
  const response = await fetch(apiLink);
  const data = await response.json();

    const topAnime: AnimeData[] = data.data.map((anime: any) => ({
      rank: anime.rank || 9999,
      title: anime.title,
      image: anime.images.jpg.image_url,
    }));

    return topAnime.sort((a, b) => a.rank - b.rank);
}

export default function Home() {
  const [animeData, setAnimeData] = useState<AnimeData[]>([]);

  useEffect(() => {
    fetchData().then((data) => {
      setAnimeData(data);
    });
  }, []);

  return (
    <div className="flex flex-col gap-8 m-3.5 min-h-screen items-center bg-zinc-50 font-sans dark:bg-black text-4xl">
      <div> 
        <h1 className="text-3xl font-medium mb-4">Welcome to AnimeHub!</h1>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {animeData.map((anime: any) => (
          <CardBox image={anime.image} title={anime.title} key={anime.title} rank={anime.rank} />
        ))}
      </div>
      

      
    </div>
  );
}
