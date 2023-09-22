export default function Loading(){
    return (
        <div className="basis-80 flex-grow-0 flex-shrink-0 cursor-wait hover:shadow-none transition duration-300 flex border rounded-lg overflow-hidden shadow-md bg-white h-[250px]">
            <div className="bg-blue-500 w-1"></div>
            <div className="p-6 flex flex-col justify-between w-full h-full animate-pulse">
                <div>
                    {/* Date Skeleton */}
                    <div className="bg-gray-300 rounded w-24 h-4 mb-2"></div>
                    
                    {/* Title Skeleton */}
                    <div className="bg-gray-300 rounded h-8 mb-2 w-full"></div>
                    
                    {/* Description Skeleton */}
                    <div className="bg-gray-300 rounded h-6 mb-2 w-3/4"></div>
                    <div className="bg-gray-300 rounded h-6 mb-2 w-1/2"></div>
                </div>
                
                {/* Author Skeleton */}
                <div className="bg-gray-300 rounded w-32 h-4 self-end"></div>
            </div>
        </div>
    )
}