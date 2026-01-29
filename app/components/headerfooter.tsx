import Link from 'next/link';

export default function Header(props : any) {
    return (
        <>
        <div className="sticky top-0 border-b max-w-screen border-t border-blue-500 bg-blue-500">
            <div className="flex items-center">
                <div >
                    <span className="text-2xl font-bold text-white p-4 items-center ">
                        {props.name}
                    </span>
                </div>
                <nav className="ml-20 pt-1 pb-1 mt-1 mb-1">
                    <Link className="align-middle p-2 mr-2 text-white rounded hover:bg-white hover:text-black" href="/">Home</Link>
                    <Link className="align-middle p-2 mr-2 text-white rounded hover:bg-white hover:text-black" href="/about">About</Link>
                    <Link className="align-middle p-2 mr-2 text-white rounded hover:bg-white hover:text-black" href="/contact">Contact</Link>
                </nav>
            </div>
        </div>
        </>
    );
}