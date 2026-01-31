'use client';

import { useState, useEffect } from "react";
import { AnimeData, dynamicTitle, fetchData, fetchTopPopular } from "@/lib/animeServices";
import { getAnilistBanner, PageProps } from "@/lib/anilistServices";
import SearchBar from "./components/searchbar";
import AnimeGrid from "./components/animegrid";
import HomepagePhoto from "./components/homepagephoto";


export default function Home() {
  const [animeData, setAnimeData] = useState<AnimeData[]>([]);
  const [alltimepopularanime, setAlltimepopularanime] = useState<AnimeData[]>([]);
  const [headerTitle, setHeaderTitle] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [anilistBanner, setAnilistBanner] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch Seasonal or Search results
        const [data, anilistBanner] = await Promise.all([
          fetchData(searchText, page),
          getAnilistBanner(page === 1 ? "57555" : "12345") // Example MAL IDs for testing
        ]);
        setAnimeData(data.topAnime);
        setHeaderTitle(data.title);
        setAnilistBanner(anilistBanner);

        // 2. Fetch Popular only if we don't have it and aren't searching
        if (alltimepopularanime.length === 0 && searchText === "") {
          // A tiny pause (200ms) prevents the API from getting grumpy
          await new Promise(res => setTimeout(res, 200));
          const popular = await fetchTopPopular();
          setAlltimepopularanime(popular);
        }
      } catch (error) {
        console.error("Failed to load anime:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [page, searchText]);
   // Removed the separate mount effect
  
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    
    setIsLoading(true);
    setPage(1);
    const result = await fetchData(searchText, 1);
    setAnimeData(result.topAnime);
    setHeaderTitle(result.title);
    setIsLoading(false);
  
  };

  return (
    <>
    
    <div className="flex flex-col gap-4 min-h-screen  max-w-screen items-center font-sans " >
      {/* <div className=" "> */}
      <HomepagePhoto image={anilistBanner}/>
      {/* </div> */}

      <div className="flex flex-col z-10 gap-2 max-w-270 w-full min-h-screen "> 
        <div className="flex flex-wrap justify-start rounded-2xl gap-2 p-3 border">
          <SearchBar searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch} />
        </div>

        <AnimeGrid animedata={animeData} isLoading={isLoading} title={dynamicTitle(searchText)} limit={5} />
        {searchText.length === 0 && <><AnimeGrid animedata={alltimepopularanime} isLoading={isLoading} title="All Time Popular Anime" limit={5} /></>}
      </div>

      {/* <div className="flex  justify-center items-center gap-4 mt-8 mb-8">
        <button 
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded bg-gray-200 text-gray-800 ${page === 1 ? 'opacity-50 ' : 'hover:bg-gray-300'}`}
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
      </div> */}

      
      
      
      
    </div></>
  );
}
