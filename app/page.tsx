'use client';

import { useState, useEffect, use, AnyActionArg } from "react";
import CardBox from "./components/card";
import LoadingCard from "./components/laodingcard"; 
import SearchBar from "./components/searchbar";


interface AnimeData {
  rank: number;
  title: string;
  image: string;  
  type: string;
  score: number;
  episodes: number | string;
  mal_id: number;
}

async function fetchData(query: string="",page: number=1):Promise<AnimeData[]> {
  const apiLink = query.length > 0 ? `https://api.jikan.moe/v4/anime?q=${query}&page=${page}` : `https://api.jikan.moe/v4/top/anime?page=${page}`;
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
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(searchText, page).then((data) => {
      setAnimeData(data);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, [page]);
  
  const handleSearch = async (event: React.FormEvent) => {
  event.preventDefault();
  
  setIsLoading(true);
  setPage(1);
  const result = await fetchData(searchText, 1);
  setAnimeData(result);
  setIsLoading(false);
  
  };

  return (
    <div className="flex flex-col gap-4 border m-3.5 min-h-screen max-w-screen items-center bg-zinc-50 font-sans dark:bg-black p-10">
      <div className="border"> 
        <h1 className="text-3xl font-medium p-2">Welcome</h1>
      </div>

      <div className="flex flex-col  gap-4 max-w-270 p-2 border"> 
        <div className="flex flex-wrap justify-start gap-2 p-2 border">
          <SearchBar searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch} />
        </div>

        <div className="w-full max-w-7xl  mx-auto  p-2 border">
          {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
                <LoadingCard key={index} />
              ))}
          </div>
          ) : (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {animeData.map((anime: any, index: number) => (
            <CardBox image={anime.image} title={anime.title} type={anime.type} key={`${anime.mal_id}-${index}`} episodes={anime.episodes} score={anime.score} />
          ))}
          </div>)}

        </div>
      </div>

      <div className="flex  justify-center items-center gap-4 mt-8 mb-8">
        <button 
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded bg-gray-200 text-gray-800 ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
        >
            Previous
        </button>

        <span className="font-bold text-gray-700">Page {page}</span>

        <button 
            onClick={() => setPage(prev => prev + 1)}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
            Next
        </button>
      </div>

      
      
      
      
    </div>
  );
}
