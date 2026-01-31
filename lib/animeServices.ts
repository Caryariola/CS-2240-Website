export interface AnimeData {
  rank: number;
  title: string;
  image: string;  
  type: string;
  score: number;
  episodes: number | string;
  mal_id: number;
  popularity: number;
}

export const dynamicTitle = (query: string) => {
  if (query.length > 0) {
    return `Search results for "${query}"`;
  }

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  let season = '';

  if (month === 11 || month <= 1) season = "Winter";
  else if (month >= 2 && month <= 4) season = "Spring";
  else if (month >= 5 && month <= 7) season = "Summer";
  else season = "Fall";

  return `${season} ${year} Anime`;
}

export async function fetchTopPopular(): Promise<AnimeData[]> {
  const res = await fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=10`);
  const json = await res.json();
  const rawData = json.data || [];

  return rawData.map((anime: any) => ({
    rank: anime.rank || 9999,
    title: anime.title_english || anime.title,
    image: anime.images.jpg.large_image_url,
    type: anime.type,
    score: anime.score || 'N/A',
    episodes: anime.episodes || 'N/A',
    mal_id: anime.mal_id,
  }));
}

export async function fetchData(query: string="",page: number=1):Promise<{topAnime: AnimeData[], title: string}> {
  const apiLink = query.length > 0 ? `https://api.jikan.moe/v4/anime?q=${query}&page=${page}` : `https://api.jikan.moe/v4/seasons/now?page=${page}`;
  const response = await fetch(apiLink);
  const data = await response.json();

  let rawData = data.data || [];

  

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
      popularity: anime.popularity || 9999
    }));

   

    if (query.length > 0) {
      return { topAnime: topAnime.sort((a, b) => a.rank - b.rank), title: dynamicTitle(query) };
    }

    return { topAnime: topAnime, title: dynamicTitle(query) };
}
