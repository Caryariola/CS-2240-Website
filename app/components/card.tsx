export default function Card(props : any){
    return (
        <>
        <div className="border border-gray-300 w-45 h-80 p-2 rounded  text-center overflow-hidden ">
            <img src={props.image} alt="Card Image" className="w-full h-2/3 object-cover rounded"/>
            <div className="p-2">
                <p className="text-xs font-bold text-left">{props.rank}. {props.title}</p>
            </div>
            
        </div>
        </>
    )
}