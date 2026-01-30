export default function SearchBar(props : any) {
    return(
        <>
        <form onSubmit={props.handleSearch} className="flex items-center">
                    <input
                      type="text"
                      value={props.searchText} onChange={(e) => props.setSearchText(e.target.value)}
                      placeholder="Search for an anime..."
                      className="border  border-gray-300 rounded-l px-3 py-1.5 text-sm w-48 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-r text-sm hover:bg-blue-600 transition duration-200"
                    >
                      Search
                    </button>
                  </form>
        </>
    )
}