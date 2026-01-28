export default function card(props : any){
    return (
        <>
        <div className="border-1 border-black w-100 h-40 rounded text-1xl text-center ">
            {props.title}
        </div>
        </>
    )
}