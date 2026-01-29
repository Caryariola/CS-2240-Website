interface PageProps {
    params: Promise<{ 
        malId: string;      // "16498"
        animename: string;  // "Shingeki_no_Kyojin"
    }>;
}


export default async function AnimeDetailsPage({ params } : PageProps) {

    const { malId } = await params;

    const response = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);
    const data = await response.json();
    const anime = data.data;

    return(
        <>
        <div className=" border m-3.5 max-w-screen justify-center gap-4  min-h-screen bg-zinc-50 font-sans p-2">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-[30%_70%] p-2 border gap-1">
                <div className="p-4 border gap-2 flex flex-col items-center">
                    <div className="w-full aspect-2/3 overflow-hidden object-cover bg-gray-300 rounded-3xl">
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

