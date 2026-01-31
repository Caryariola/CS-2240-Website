import Link from 'next/link';


export default function Card(props : any){
    const safeTitle = props.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace symbols with dashes
        .replace(/(^-|-$)+/g, '');

    const pageUrl = `/Anime/${props.malId}/${safeTitle}`;
    return (
        <>
        
        <Link href={pageUrl}>
        <div className='perspective-[1000px]'>
            <div className=" backdrop-blur-2xl w-full rounded-2xl text-center overflow-hidden cursor-pointer transition duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl ">
                <div className=" w-full aspect-2/3  overflow-hidden rounded-2xl ">
                    <img src={props.image} alt={props.title} loading='lazy' className="w-full h-full object-cover"/>
                </div> 
                <div className="p-2">
                    <p className="text-xs font-bold text-left h-8 line-clamp-2 overflow-hidden mb-1">{props.title}</p>
                    <p className="text-xs text-gray-500 text-left">{props.type}</p>
                    <p className="text-xs text-gray-500 text-left">EP: {props.episodes}</p>
                    <p className="text-xs text-gray-500 text-left">Score: {props.score}</p>
                </div>
            </div>
        </div>    
        </Link>
        
        </>
    )
}