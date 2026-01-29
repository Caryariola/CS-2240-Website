export default function LoadingCard(){
    return (
        <>  
        <div className="  border border-gray-300 w-full  rounded-2xl  text-center overflow-hidden bg-white animate-pulse">
            <div className=" w-50 aspect-3/4 overflow-hidden object-cover bg-gray-300">
            </div>
            <div className="p-2 bg-gray-300 overflow-hidden ">
                <p className="text-xs font-bold text-left h-8 overflow-hidden mb-1"></p>
                <p className="text-xs  text-gray-500 text-left"></p>
                <p className="text-xs text-gray-500 text-left"></p>
                <p className="text-xs  text-gray-500 text-left"></p>
            </div>
            
        </div>
        </>
    )
}