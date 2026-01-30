interface PageProps {
    params: Promise<{ 
        malId: string;      // "16498"
        animename: string;  // "Shingeki_no_Kyojin"
    }>;
}

async function getAnilistBanner(malId : any) {
  const query = `
    query ($id: Int) {
      Media (idMal: $id, type: ANIME) {
        bannerImage
        coverImage {
          extraLarge
        }
      }
    }
  `;

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      variables: { id: parseInt(malId) }
    })
  });

  const result = await response.json();
  return result.data?.Media?.bannerImage || result.data?.Media?.coverImage?.extraLarge;
}


export default async function AnimeDetailsPage({ params } : PageProps) {

    const { malId } = await params;

    const [response, anilist] = await Promise.all([
      fetch(`https://api.jikan.moe/v4/anime/${malId}`),
      getAnilistBanner(malId)
    ]);
    const data = await response.json();
    const anime = data.data;

    return(
        <>
        <style dangerouslySetInnerHTML={{ __html: `
                :root {
                    --dynamic-bg: url(${anilist || anime.images.jpg.large_image_url});
                }
            `}} />
        <div className=" border  justify-center gap-4  min-h-screen font-sans p-2  " >
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[30%_70%] p-2 border gap-1">
                <div className="p-4 border gap-2 flex flex-col items-center">
                    <div className="w-full aspect-2/3 overflow-hidden object-cover rounded-3xl">
                        <img src={anime.images.jpg.large_image_url} alt={anime.title} className="w-full h-full object-cover"/>
                    </div>

                    <div className=" border p-2 text-sm">
                        Alternative Titles:
                        <div>
                            {anime.title_english && <div>English: {anime.title_english}</div>}
                            {anime.title_japanese && <div>Japanese: {anime.title_japanese}</div>}
                        </div>
                    </div>
                </div>

                <div className="w-full gap-2 flex flex-col">
                    <div className=" border p-2 text-2xl">
                        {anime.title}
                    </div>

                    <div className=" border text-sm font-light p-2">
                        {anime.synopsis}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

