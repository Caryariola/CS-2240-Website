export default function Card(props : any){
    return (
        <>
        <div className=" border border-gray-300 w-45 h-93  rounded  text-center overflow-hidden ">
            <div className=" w-full aspect-2/3 overflow-hidden">
                <img src={props.image} alt="Card Image" className="w-full h-full object-cover rounded"/>
            </div>
            <div className="p-2">
                <p className="text-xs font-bold text-left h-8 line-clamp-2 overflow-hidden mb-1">{props.title}</p>
                <p className="text-xs text-gray-500 text-left">{props.type}</p>
                <p className="text-xs text-gray-500 text-left">Episodes: {props.episodes}</p>
                <p className="text-xs text-gray-500 text-left">Score: {props.score}</p>
            </div>
            
        </div>
        </>
    )
}