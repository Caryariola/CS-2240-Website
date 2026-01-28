'use client';

import { useState, useEffect, use, AnyActionArg } from "react";
import CardBox from "./components/card";



interface AnimeData {
  rank: number;
  title: string;
  image: string;  
  type: string;
  score: number;
  episodes: number | string;
  mal_id: number;
}

async function fetchData(query: string=""):Promise<AnimeData[]> {
  const apiLink = query.length > 0 ? `https://api.jikan.moe/v4/anime?q=${query}` : "https://api.jikan.moe/v4/top/anime";
  const response = await fetch(apiLink);
  const data = await response.json();

  let rawData = data.data;

  if (query.length > 0) {
    // Break search into words: "Blue Box" -> ["blue", "box"]
    const searchTerms = query.toLowerCase().split(" ");

    rawData = rawData.filter((anime: any) => {
      const standard = (anime.title || "").toLowerCase();
const english = (anime.title_english || "").toLowerCase();

// 2. GLUE them together (Concatenate)
const combinedText = standard + " " + english;

// 3. Search inside the combined text
return searchTerms.every((term) => combinedText.includes(term));
    });
  }

    const topAnime: AnimeData[] = rawData.map((anime: any) => ({
      rank: anime.rank || 9999,
      title: anime.title_english || anime.title,
      image: anime.images.jpg.image_url,
      type: anime.type,
      score: anime.score || 'N/A',
      episodes: anime.episodes || 'N/A',
      mal_id: anime.mal_id,
    }));

    if (query.length > 0) {
      return topAnime.sort((a, b) => a.rank - b.rank);
    }

    return topAnime.sort((a, b) => a.rank - b.rank);
}




export default function Home() {
  const [animeData, setAnimeData] = useState<AnimeData[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData().then((data) => {
      setAnimeData(data);
      setIsLoading(false);
    });
  }, []);

  const handleSearch = async (event: React.FormEvent) => {
  event.preventDefault();
  
  setIsLoading(true);
  const result = await fetchData(searchText);
  setAnimeData(result);
  setIsLoading(false);
};

  return (
    <div className="flex flex-col gap-8 m-3.5 min-h-screen items-center bg-zinc-50 font-sans dark:bg-black text-4xl">
      <div> 
        <h1 className="text-3xl font-medium mb-4">Welcome to AnimeHub!</h1>
      </div>
      <div className="flex justify-start w-238.5">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={searchText} onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for an anime..."
            className="border  border-gray-300 rounded-l px-3 py-1.5 text-sm w-48 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1.5 rounded-r text-sm hover:bg-blue-600 transition duration-200"
          >
            Search
          </button>
        </form>
      </div>
      {isLoading ? (
         <div className="text-xl text-blue-500 font-bold mt-10 animate-pulse">
            Loading anime...
         </div>
       ) : (<div className="grid grid-cols-5 gap-3">
        {animeData.map((anime: any, index: number) => (
          <CardBox image={anime.image} title={anime.title} type={anime.type} key={`${anime.mal_id}-${index}`} episodes={anime.episodes} score={anime.score} />
        ))}
      </div>)}
      
      
    </div>
  );
}
