import LoadingCard from "./laodingcard"
import CardBox from "./card"



export default function AnimeGrid(props: any) {
  const lmt = props.search && props.search.length > 0 ? 25 :  5;
    
  

    return (
        <>
        <div className=""> 
                <h1 className="text-3xl font-medium p-2">{props.title}</h1>
              </div>
        
                <div className="w-full max-w-7xl  mx-auto rounded-2xl p-3 border bg-black/10">
                  {props.isLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {[...Array(lmt)].map((_, index) => (
                        <LoadingCard key={index} />
                      ))}
                  </div>
                  ) : (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {props.animedata.slice(0, lmt).map((anime: any, index: number) => (
                    <CardBox image={anime.image} title={anime.title}  type={anime.type} key={`${anime.mal_id}-${index}`} episodes={anime.episodes} score={anime.score} malId={anime.mal_id} />
                  ))}
                  </div>)}    
                </div>
        </>
    )};