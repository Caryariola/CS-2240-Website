import Link from 'next/link';

export default function Header(props : any) {
    return (
        <>
        <header className='sticky top-0 z-50 m-2 md:m-6'>
            <div className=" max-w-screen p-2  rounded-2xl border backdrop-blur bg-black/20">
            <div className="flex items-center">
                <div >
                    <span className="text-lg sm:text-2xl font-bold text-white p-4 items-center ">
                        <Link href="/">{props.name}</Link>
                    </span>
                </div>
                <nav className="flex ml-4 items-center gap-2 md:gap-5  md:ml-20">
                    <Link className="whitespace-nowrap align-middle text-xs sm:text-base p-2  text-white rounded hover:bg-white hover:text-black transition-colors" href="/">Home</Link>
                    <Link className="whitespace-nowrap align-middle text-xs sm:text-base p-2  text-white rounded hover:bg-white hover:text-black transition-colors" href="/about">About</Link>
                    <Link className="whitespace-nowrap align-middle text-xs sm:text-base p-2 text-white rounded hover:bg-white hover:text-black transition-colors" href="/contact">Contact</Link>
                </nav>
            </div>
        </div>

        </header>
        
        </>
    );
}

export function Footer() {
    return (
        <footer className="w-full mt-8 p-4 border-t text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} AnimeHub. All rights reserved.</p>
        </footer>
    );
}